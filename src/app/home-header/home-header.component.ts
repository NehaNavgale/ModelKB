import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {SearchComponent} from '../search/search.component';
import {HttpClient} from '@angular/common/http';

import {ViprahubService} from '../viprahub.service';
import {Router} from '@angular/router';
import {OrderPipe} from 'ngx-order-pipe';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  public loginout = 'Log In';
  public hideSignup = false;
  search = { text: ''};


  constructor(public router: Router, private http: HttpClient, public vipraService: ViprahubService, private orderPipe: OrderPipe) { }
  searchC = new SearchComponent(this.http, this.vipraService, this.router, this.orderPipe);
  logInOut() {
    if (this.loginout === 'Log Out') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  getResults() {
    this.vipraService.searchText = this.search.text;
    this.vipraService.getSearchResults(this.search.text);
    this.router.navigate(['/theme/search']);
  }
  ngOnInit() {
    if (this.router.url === '/userdashboard') {
      this.loginout = 'Log Out';
      this.hideSignup = true;
    } else {
      this.loginout = 'Log In';
      this.hideSignup = false ;
    }
  }

}
