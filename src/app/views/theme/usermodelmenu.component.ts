import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {LoggedinUserInfoService} from '../../services/loggedin-user-info.service';
import {ModelsService} from '../../models.service';

@Component({
  templateUrl: 'usermodelmenu.component.html'
})
export class UsermodelmenuComponent implements OnInit {
  public allModelsBasedOnUserIdFromDb: any;
  public distinctModelNames: Array<any> = [];
  public allExperiments: Array<any> = [];
  public isShowFolderView = true;
  public isShowExpView = false;
  public selectedModel;

  constructor(private loggedinUserInfoService: LoggedinUserInfoService, private modelsService: ModelsService) { }
  getExperiments(modelName) {
    this.selectedModel = modelName;
    this.isShowFolderView = false;
    this.isShowExpView = true;
      this.allExperiments = this.allModelsBasedOnUserIdFromDb
        .filter(model => model.name === modelName)
        .map(model => model.experiment);

    console.log(this.allExperiments);
  }
  getExpData(expName) {
    alert(expName);
  }
  backToModelView() {
    this.isShowFolderView = true;
    this.isShowExpView = false;
  }
  ngOnInit() {
  this.isShowFolderView = true;
    if (this.loggedinUserInfoService.userInfo.emailID) {
      this.modelsService.getModelsBasedOnUserID(this.loggedinUserInfoService.userInfo.emailID).subscribe(response => {
        this.allModelsBasedOnUserIdFromDb = response;

        this.distinctModelNames = Array.from(new Set(this.allModelsBasedOnUserIdFromDb.map(model => model.name)));
      //  console.log('Model Names________________' + this.distinctModelNames);
      });
    }
  }
}
