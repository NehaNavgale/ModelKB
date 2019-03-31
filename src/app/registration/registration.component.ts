import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import registration from '../models/registration';
import { RegistrationService} from '../services/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = {
     'firstname': '',
     'lastname': '',
     'email': '',
     'password': '',
     'cpassword': ''
    };
  missingField: Boolean = false;
  constructor(private registrationService: RegistrationService, private router: Router) {
    // this.resetuser();
  }
  // resetuser() {
  //   this.user = {
  //     'firstname': '',
  //     'lastname': '',
  //     'username': '',
  //     'password': '',
  //     'cpassword': ''
  //   };
  // }
  ngOnInit() {

  }
  registerUser() {


    const userDetails = {} as registration;
    userDetails.emailID = this.user.email;
    userDetails.firstName = this.user.firstname;
    userDetails.lastName = this.user.lastname;
    userDetails.password = this.user.password
    userDetails.confirmPassword = this.user.cpassword;
    if (this.user.email === '' && this.user.firstname === '' && this.user.lastname === '' && this.user.password === '' && this.user.cpassword === ''){
      this.missingField = true;
    }
    console.log(userDetails);
    this.registrationService.addUser(userDetails).subscribe(data => {
      console.log('After Backend call', +data);
      this.router.navigate(['/login']);
    });
  }

  }

