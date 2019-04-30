import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedinUserInfoService {

  public userInfo = {
    'emailID': '',
    'fullName': '',
    'uploadedCount': '',
    'downloadedCount': ''
  };
  constructor() { }
  setUsers(data) {
     this.userInfo.emailID = data.user.emailID;
     this.userInfo.fullName = data.user.fullName;
     this.userInfo.uploadedCount = data.user.uploadCount;
     this.userInfo.downloadedCount = data.user.downloadedCount;
     console.log('Inside SetUsers');
     console.log(this.userInfo);
  }
  getUsers() {
   return this.userInfo;
  }
}
