import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {MatTabsModule, MatSidenavModule} from '@angular/material';
import {ViewmodeldashboardService} from '../../viewmodeldashboard.service';
import {ViprahubService} from '../../viprahub.service';
import { FilesService } from '../../files.service';
import { ModelsService } from '../../models.service';
import { LoggedinUserInfoService } from '../../services/loggedin-user-info.service';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { MatDialog, MatDialogRef } from '@angular/material';
import {ProgressSpinnerDialogComponent} from '../../progress-spinner/progress-spinner-dialog.component';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { RatingsComponent} from "../../ratings/ratings.component";
import {DialogService} from "../../dialog.service";
import {RatingsService} from "../../ratings.service";

@NgModule({
  imports: [
    MatTabsModule,
  ]
})

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  modelObj;
  modelID;
  downloadCount;
  Author;
  loggedInUserInfo;
  comment;
  restrictRating;
  public expComments;
  currentRate ;

  uri = 'https://viprahubbackend.herokuapp.com/comments';

  constructor(
    private dialogService: DialogService,
    private ratingsService: RatingsService,
    private viewmodelDashboardService: ViewmodeldashboardService,
    private viprahubService: ViprahubService,
    private filesService: FilesService,
    private modelsService: ModelsService,
    private loggedinUserInfoService: LoggedinUserInfoService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.viprahubService.getModelById(localStorage.getItem('modelID')).subscribe(data => {
      this.modelObj = data;
      this.downloadCount = this.modelObj.downloadedCount;
      this.storeModelObj();
      console.log(this.getLocalModelObj());
    });

    var modelID = localStorage.getItem('modelID');
    this.getComments(modelID);
    this.getRatings(modelID);
  }

  public themeColors() {
  }

  storeModelObj(){
    localStorage.setItem('Author', this.modelObj.Author);
  }
  getLocalModelObj(){
    this.Author = localStorage.getItem('Author');
    return this.Author;
  }
  restrictedRating() {
    this.loggedInUserInfo = this.loggedinUserInfoService.getUsers();
    this.Author= localStorage.getItem('Author');
    if(this.loggedInUserInfo.emailID == this.Author){
      this.restrictRating = true;
    }else{
      this.dialogService.openRatingDialogue(RatingsComponent, {});
    }

  }
  getRatings(modelID){
    this.ratingsService.getRatings(modelID).subscribe(res => {
      // @ts-ignore
      if(res.length > 0){
        this.currentRate =  res[0].AvgRating;
      }
      console.log('get Ratings Result', res);

    });
  }


  ngOnInit() {

  }
  updateDownloadCount() {
    // const experiment = this.modelObj.experiment;
    this.downloadCount = parseInt(this.downloadCount, 10) + 1;
    this.downloadCount = this.downloadCount.toString();
    console.log(this.downloadCount);
    const modelDetails = {
      experiment: this.modelObj.experiment,
      downloadedCount: this.downloadCount
    };
    this.viprahubService.updateDownloadCount(modelDetails).subscribe(data => {
      console.log('updated download count', + data);
    });
  }
  downloadFilesInZip() {
    this.updateDownloadCount();
    const experiment = this.modelObj.experiment;
    const zipeFileName = experiment + '.zip';
    const zip: JSZip = new JSZip();
    const folder = zip.folder(experiment);
    this.modelsService.getModelsBasedOnExperiment(experiment).subscribe(response => {
      const dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true
      });

      if (response.length === 0) {
        alert('Files are not found for this model name.');
      }
      response.map((model) => {
        model.fileReferenceIDs.map((id) => {
          this.filesService.getFileBasedOnFileReferenceId(id).subscribe(response => {
            response.map((file) => {
              this.filesService.getChunkBasedOnFileId(file.filename).subscribe(res => {
                const fileOutput = new Blob([res], { type: file.contentType });
                console.log(fileOutput);
                folder.file(file.filename, fileOutput);

                if (file.contentType === 'application/octet-stream') {
                  zip.generateAsync({type : 'blob'})
                    .then(function(content) {
                      dialogRef.close();
                      saveAs(content, zipeFileName);
                    });
                }
              });
            });
          });
        });
      });
    });
  }

  // getRating() return rating from 0-5

// posting Comments related to experiments
  postComment() {
    this.loggedInUserInfo = this.loggedinUserInfoService.getUsers();
    this.modelID = localStorage.getItem('modelID');
    const commentObj = {
      'comments': '',
      'modelID' : '',
      'emailID' : '',
      'fullName' : '',
      'postedDate': ''
    };
    const responseComments = {};
    commentObj.comments = this.comment;
    commentObj.modelID = this.modelID;
    commentObj.emailID = this.loggedInUserInfo.emailID;
    commentObj.fullName = this.loggedInUserInfo.fullName;
    console.log('Before service call', commentObj);
    this.http.post(`${this.uri}/postComments`, commentObj).subscribe(data => {
      console.log(data);
      this.getComments(this.modelID);
      this.comment = "";
    });
  }

// Fetching comments based on experiment
  getComments(id) {
    this.http.get(`${this.uri}/getAllComments/${id}`).subscribe(res => {
      this.expComments =  res;
      return this.expComments;
      console.log('getresult', this.expComments);
    });
  }
  downloadModel() {

    window.open('https://viprahubbackend.herokuapp.com/uploadToMongo/zipfiles');

    // this.http.get('http://localhost:4000/uploadToMongo/zipfiles').subscribe(res => {
    //
    // });
  }
}
