import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {RatingsService} from "../ratings.service";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  public currentRate = 0;
  modelID;
  expRatings;
  AvgRatings;
  thanks;
  constructor( public dialogRef: MatDialogRef<RatingsComponent> , private ratingsService: RatingsService) {
    // console.log(this.currentRate);
  }

  rateModel() {
    console.log(this.currentRate);
    this.ratingsService.postRating(this.currentRate).subscribe(data => {
      console.log('After Rating Backend call', data);
      this.modelID = localStorage.getItem('modelID');
      this.AvgRatings = this.getRatings(this.modelID);
      console.log(this.AvgRatings);
      this.thanks = true;
    });
  }

  getRatings(modelID) {
    this.ratingsService.getRatings(this.modelID).subscribe(res => {
      this.expRatings =  res;
      console.log('get Ratings Result', this.expRatings);
      return this.expRatings;
    });
  }

  ngOnInit() {

  }

}
