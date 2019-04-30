import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService} from '../services/login.service';
import { LoggedinUserInfoService } from '../services/loggedin-user-info.service';
import {computeStyle} from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailID: String = '';
  password: String = '';
  InvalidUser: Boolean = false;
  constructor(private loginService: LoginService, private loggedInUserInfo: LoggedinUserInfoService, private router: Router) { }
  ngOnInit() {
  }
  userLogin() {
    const user = {
      emailID: this.emailID,
      password: this.password
    };
    /*Checking if users exists in DB by calling LoginServices*/
    this.loginService.authenticate(user).subscribe( (data) => {
      /*Receives success message if user exists and with correct credentails*/
      // @ts-ignore
      if (data.message === 'Success') {
        console.log(data);
        this.loggedInUserInfo.setUsers(data);
        // const userInfo = this.loggedInUserInfo.getUsers();
        // console.log(userInfo);
        this.router.navigate(['./dashboard']);
        // @ts-ignore
        console.log(data.message);
      } else {
        // @ts-ignore
        console.log(data.message);
        this.InvalidUser = true;
      }
    });
  }


}

