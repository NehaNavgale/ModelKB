import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ViprahubService} from '../viprahub.service';
import {Router} from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  listOfModels;
  search = { text: ''};
  order = 'AccuracyValue';

  constructor(private http: HttpClient, public vipraService: ViprahubService, private router: Router, private orderPipe: OrderPipe) {
  }
  ngOnInit() {
    this.listOfModels = this.orderPipe.transform(this.vipraService.searchResults, this.order);
    console.log(this.listOfModels);
    this.vipraService.getMetadata().subscribe(res => {
      console.log(res);
      this.vipraService.searchResults = res;
    }, err => {
      console.log(err);
    });
  }

  setOrder(value: string) {
    this.order = value;
  }
  viewModel(id) {
    localStorage.setItem('modelID', id);
    this.router.navigate(['./theme/colors'])
  }
}
