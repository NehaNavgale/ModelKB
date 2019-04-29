import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {MatTabsModule, MatSidenavModule} from '@angular/material';
import {ViewmodeldashboardService} from '../../viewmodeldashboard.service';
import {ViprahubService} from '../../viprahub.service';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {LoggedinUserInfoService} from '../../services/loggedin-user-info.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
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
  loggedInUserInfo;
  comment;
  public expComments;

  uri = 'http://localhost:4000/comments';
  constructor(private viewmodelDashboardService: ViewmodeldashboardService, private viprahubService: ViprahubService, private http: HttpClient, private loggedinUserInfoService: LoggedinUserInfoService) {
     this.viprahubService.getModelById(localStorage.getItem('modelID')).subscribe(data => {
       this.modelObj = data;
     });
  }
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

    this.http.post(`${this.uri}/postComments`, commentObj, httpOptions).subscribe(data => {
      console.log(data);
      this.getComments(this.modelID);
     /* this.http.get(`${this.uri}/getAllComments?modelID=` + this.modelID, httpOptions).subscribe(res => {
        this.expComments =  res;
        return this.expComments;
        console.log('getresult', this.expComments);
      });*/
    });
  }
  public themeColors() {
  }

  ngOnInit() {
    this.modelID = localStorage.getItem('modelID');
    this.getComments(this.modelID);
  }
  getComments(id) {
    this.http.get(`${this.uri}/getAllComments/${id}`, httpOptions).subscribe(res => {
      this.expComments =  res;
      return this.expComments;
      console.log('getresult', this.expComments);
    });
  }
  downloadModel() {

    window.open('http://localhost:4000/uploadToMongo/zipfiles');

    // this.http.get('http://localhost:4000/uploadToMongo/zipfiles').subscribe(res => {
    //
    // });
  }
}
