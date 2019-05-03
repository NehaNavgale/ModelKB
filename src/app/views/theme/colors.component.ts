
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
  public experiment = 'Exp1';

  constructor(
    private viewmodelDashboardService: ViewmodeldashboardService,
    private viprahubService: ViprahubService,
    private filesService: FilesService,
    private modelsService: ModelsService,
    private loggedinUserInfoService: LoggedinUserInfoService,
    private dialog: MatDialog
  ) {
    this.viprahubService.getModelById(localStorage.getItem('modelID')).subscribe(data => {
      this.modelObj = data;
    });
  }

  public themeColors() {
  }

  ngOnInit() {
  }

  downloadFilesInZip() {
    const zipeFileName = this.experiment + '.zip';
    const zip: JSZip = new JSZip();
    const folder = zip.folder(this.experiment);

    this.modelsService.getModelsBasedOnExperiment(this.loggedinUserInfoService.userInfo.emailID, this.experiment).subscribe(response => {
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
}
