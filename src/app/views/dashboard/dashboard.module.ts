import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {ViprahubService} from '../../viprahub.service';
import {HttpClient} from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {MatButtonModule} from "@angular/material";
import { OrderPipe } from 'ngx-order-pipe';
import {Router} from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    MatButtonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule {
  constructor(private orderPipe: OrderPipe, private vipraService: ViprahubService, private http: HttpClient) {
    this.vipraService.getMetadata().subscribe(res => {
      this.vipraService.searchResults = res;
    }, err => {
      console.log(err);
    });
  }
}
