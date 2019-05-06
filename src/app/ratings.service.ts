import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { LoggedinUserInfoService} from "./services/loggedin-user-info.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


const uri= 'http://localhost:4000/ratings';
@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient, private loggedinUserInfoService: LoggedinUserInfoService) {
  }

  loggedInUserInfo;
  modelID;
  expRatings;

  //Posting Ratings for an experiments

  postRating(currentrating) {
    console.log("Rating Service call", currentrating);
    /*  return this.http.post(`${uri}/${modelID}`,{rating:currentrating});*/
    this.loggedInUserInfo = this.loggedinUserInfoService.getUsers();
    this.modelID = localStorage.getItem('modelID');
    const ratingObj = {
      'rating': '',
      'modelID': '',
      'emailID': '',
      'fullName': '',
    };
    ratingObj.rating = currentrating;
    ratingObj.modelID = this.modelID;
    ratingObj.emailID = this.loggedInUserInfo.emailID;
    ratingObj.fullName = this.loggedInUserInfo.fullName;
    console.log('Before service call', ratingObj);
     return this.http.post(`${uri}/postRating`, ratingObj, httpOptions);
  }


  //Fetching ratings based on experiment
  getRatings(id) {
   return this.http.get(`${uri}/getAllRatings/${id}`, httpOptions);
  }
}
