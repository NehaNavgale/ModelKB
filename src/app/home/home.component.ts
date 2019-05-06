import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import {ViprahubService} from '../viprahub.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true } }
  ]
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private vipraHubService: ViprahubService) {
  }
  listOfModels;
  listOfCategories;
  // readJSON() {
  //   this.http.get('../../assets/modelData.json').
  //   subscribe(modelData => {
  //   this.listOfModels = modelData['models'];
  //   console.log(modelData['models']);
  //   }, error => {});
  // }
  goToSearch() {
    this.router.navigateByUrl('/search');
  }

  getModels(categories) {
  const id = categories._id;
  this.vipraHubService.searchMetadataByCategory(id).subscribe(res => {
    console.log(res);
    this.listOfModels = res;
  }, err => {
    console.log(err);
  });
  //   this.vipraHubService.getMetadata().subscribe(res => {
  //      console.log(res);
  //     this.listOfModels = res;
  //   }, err => {
  //     console.log(err);
  //   });
  }

  ngOnInit() {
    // this.readJSON();
    this.vipraHubService.getCategory().subscribe(res => {
      // console.log(res);
      this.listOfCategories = res;
    }, err => {
      console.log(err);
    });

    this.vipraHubService.getMetadata().subscribe(res => {
      console.log(res);
      this.listOfModels = res;
    }, err => {
      console.log(err);
    });

  }
}
