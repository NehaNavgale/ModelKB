import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {combineAll} from "rxjs/operators";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ViewmodeldashboardService {
  /*modelObj =
    {
      ModelId:1,
      Overview : {
        DESCRIPTION: 'SqueezeNet begins with a standalone convolution layer (conv1',
        APPLICATION:'ImageNet',
        TASK: 'Classification: ImageNet classification',
        TYPE: 'Supervised learning',
        ARCHITECTURE : 'Convolutional Neural Network (CNN)'
      },
      Publication :{
        TITLE: 'SqueezeNet: AlexNet-level accuracy with 50x fewer parameters and <0.5MB model size',
        AUTHORS: 'Forrest N. Iandola, Song Han, Matthew W. Moskewicz, Khalid Ashraf, William J. Dally, Kurt Keutzer',
        ABSTRACT: 'Recent research on deep neural networks has focused primarily on',
        YEAR: '2016'

      },
      Architecture : {}
    }*/

  constructor(private http: HttpClient) { }
  modelObj;
   uri = 'https://viprahubbackend.herokuapp.com/viewModel';
  getModel() {
   console.log('Hi Service');
   console.log(this.uri);
   return this.http.get(`${this.uri}`, httpOptions);

  }
}

