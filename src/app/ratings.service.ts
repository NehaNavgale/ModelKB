import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { LoggedinUserInfoService} from "./services/loggedin-user-info.service";


const uri= 'https://viprahubbackend.herokuapp.com/ratings';
@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient, private loggedinUserInfoService: LoggedinUserInfoService) {
  }

  loggedInUserInfo;
  modelID;
  expRatings;
  newRatings;

  // Fetching ratings based on experiment
  getRatings(id) {
    return this.http.get(`${uri}/getAllRatings/${id}`);
  }

  // Posting Ratings for an experiments

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
    // this.expRatings = this.getRatings(this.modelID);
    // console.log(this.expRatings);
    return this.http.post(`${uri}/postRating`, ratingObj);
  }
}
