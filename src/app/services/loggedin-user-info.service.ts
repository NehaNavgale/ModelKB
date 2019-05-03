import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedinUserInfoService {

  userInfo = {
    'emailID': '',
    'fullName': '',
    'uploadedCount': '',
    'downloadedCount': ''
  };
  constructor() { }
  setUsers(data) {

     // this.userInfo.emailID = data.user.emailID;
     // this.userInfo.fullName = data.user.fullName;
     // this.userInfo.uploadedCount = data.user.uploadCount;
     // this.userInfo.downloadedCount = data.user.downloadedCount;
     console.log('Inside SetUsers');
     console.log(this.userInfo);

    // this.userInfo.emailID = data.user.emailID;
    // this.userInfo.fullName = data.user.fullName;
    // console.log('Inside SetUsers');
    // console.log(this.userInfo);
    localStorage.setItem('LoggedinEmailId', data.user.emailID);
    localStorage.setItem('LoggedinFullName', data.user.fullName );

  }

  getUsers() {
    this.userInfo.emailID = localStorage.getItem('LoggedinEmailId');
    this.userInfo.fullName = localStorage.getItem('LoggedinFullName');
    // console.log(this.userInfo);
    return this.userInfo;
  }
}
