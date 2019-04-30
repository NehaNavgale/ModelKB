import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {LoggedinUserInfoService} from '../../services/loggedin-user-info.service';
import {ModelsService} from '../../models.service';
import { Router} from "@angular/router";

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

  constructor(private loggedinUserInfoService: LoggedinUserInfoService, private modelsService: ModelsService, private router: Router) { }
  modelObj;
  getExperiments(modelName) {
    this.selectedModel = modelName;
    this.isShowFolderView = false;
    this.isShowExpView = true;
      this.allExperiments = this.allModelsBasedOnUserIdFromDb
        .filter(model => model.name === modelName)
        .map(model => model);

    console.log(this.allExperiments);
  }

  getExpData(modelID) {
    localStorage.setItem('modelID', modelID);
    this.router.navigate(['./theme/colors']);
  }
  backToModelView() {
    this.isShowFolderView = true;
    this.isShowExpView = false;
  }
  ngOnInit() {
  this.isShowFolderView = true;
    if (this.loggedinUserInfoService.getUsers().emailID) {
      this.modelsService.getModelsBasedOnUserID(this.loggedinUserInfoService.getUsers().emailID).subscribe(response => {
        this.allModelsBasedOnUserIdFromDb = response;

        this.distinctModelNames = Array.from(new Set(this.allModelsBasedOnUserIdFromDb.map(model => model.name)));
      //  console.log('Model Names________________' + this.distinctModelNames);
      });
    }
  }
}
