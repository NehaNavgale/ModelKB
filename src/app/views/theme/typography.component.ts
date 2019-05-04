import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ViprahubService} from '../../viprahub.service';
import {Router} from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import {LoggedinUserInfoService} from '../../services/loggedin-user-info.service';
import {ViewmodeldashboardService} from '../../viewmodeldashboard.service';

@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent {

  listOfModels;
  search = { text: ''};
  order = 'AccuracyValue';
  listOfCategories;
  table = false;
  public modelID;
  displayCategory = true;
  displayRating = true;
  categoryList = [];
  result = [];
  filterSelected = [];
  ratingsList = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
  modelObj;

  constructor(private http: HttpClient, public vipraService: ViprahubService, private router: Router,
              private orderPipe: OrderPipe, private userInfo: LoggedinUserInfoService, private viewmodelDashboardService: ViewmodeldashboardService) {
    // this.listOfModels = this.orderPipe.transform(this.vipraService.searchResults, this.order);
    console.log(userInfo.getUsers());
    this.vipraService.getMetadata().subscribe(res => {
      this.vipraService.backupResults = res;
      this.vipraService.searchResults = res;
    }, err => {
      console.log(err);
    });

    this.vipraService.getCategory().subscribe(res => {
      console.log(res);
      this.listOfCategories = res;
    }, err => {
      console.log(err);
    });

    // this.vipraService.getModelById(localStorage.getItem('modelID')).subscribe(data => {
    //   this.modelObj = data;
    // });
  }
  showTiles() {
    this.table = false;
  }
  showGrids() {
    this.table = true;
  }
  viewModel(id) {
    localStorage.setItem('modelID', id);
    this.router.navigate(['./theme/colors']);
  }
  setOrder(value: string) {
    this.order = value;
  }
  filterChecked(e) {
    const finalResult = [];
    if (e.target.checked) {
    this.filterSelected.push(e.target.id);
    this.filterSelected.forEach(item => {
      this.result = this.vipraService.backupResults.filter(element => {
        return element.categoryID === item || element.Rating === item;
      });
      this.result.forEach(element => {
        finalResult.push(element);
      });
    });
    } else {
      const index: number = this.filterSelected.indexOf(e.target.id);
      if (index !== -1) {
        this.filterSelected.splice(index, 1);
      }
      if (this.filterSelected.length > 0) {
        this.filterSelected.forEach(item => {
          this.result = this.vipraService.backupResults.filter(element => {
            return element.categoryID === item || element.Rating === item;
          });
          this.result.forEach(element => {
            finalResult.push(element);
          });
        });
      } else {
        this.vipraService.backupResults.forEach(element => {
          finalResult.push(element);
        });
      }
    }
    console.log(this.filterSelected);
    console.log(this.result);
    console.log(finalResult);
    this.vipraService.searchResults = finalResult;
  }
  // ratingChecked(e) {
  //   if (e.target.checked) {
  //     this.selectedRatings.push(e.target.id);
  //     this.selectedRatings.forEach(item => {
  //       this.result = this.vipraService.backupResults.filter(element => {
  //         return element.categoryID === item;
  //       });
  //     });
  //   }
  // }
  expandCategory() {
    this.displayCategory = true;
  }
  contractCategory() {
    this.displayCategory = false;
  }
  expandRating() {
    this.displayRating = true;
  }
  contractRating() {
    this.displayRating = false;
  }
}
