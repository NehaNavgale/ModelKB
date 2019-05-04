import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UploadDownloadComponent} from '../upload/upload.component';
import { DialogService } from '../dialog.service';
import { ViprahubService } from '../viprahub.service';
import {ViewEncapsulation} from '@angular/core';
import { LoggedinUserInfoService } from '../services/loggedin-user-info.service';
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserdashboardComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string [] = ['Model1', 'Model2', 'Model3', 'Model4', 'Model5'];
  public barChartType: any = 'bar';
  public barChartLegend: any = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 70], label: 'No.of.Views'}
  ];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#103063',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

  constructor(private dialogService: DialogService, public loginsuersInfo: LoggedinUserInfoService,
              private viprahubService: ViprahubService , private router: Router) {}

  /**
   * Show the login screen in a dialog.
   */
  openUploadDownloadComponent() {
    this.dialogService.open(UploadDownloadComponent, {
    });
  }
  viewModels() {
    this.router.navigate(['./viewmodeldashboard']);
  }
  ngOnInit() {
    this.viprahubService.searchUserModels(this.loginsuersInfo.getUsers().emailID).subscribe(res => {
      console.log(res);
      this.viprahubService.searchResults = res;
    }, err => {
      console.log(err);
    });
  }

}
