import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import {ViprahubService} from '../../viprahub.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoggedinUserInfoService} from '../../services/loggedin-user-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  search = { text: ''};
  userEmail;
  userprofileInfo;
  hidden = false;
  constructor(public router: Router, private http: HttpClient,
              private userInfo: LoggedinUserInfoService, public vipraService: ViprahubService, @Inject(DOCUMENT) _document?: any) {
    this.userprofileInfo = this.userInfo.getUsers();
   /* console.log("Profile", this.userprofileInfo.emailID);*/



    this.changes = new MutationObserver((mutations) => {
     this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
     });
    this.userEmail = this.userInfo['emailID'];
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  getResults() {
    this.vipraService.searchText = this.search.text;
    this.vipraService.getSearchResults(this.search.text);
    this.router.navigate(['/theme/search']);
  }
  logout(){
    this.userInfo.logout();
    this.router.navigate(['./login']);
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
