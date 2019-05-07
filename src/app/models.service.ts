import { Injectable } from '@angular/core';
import {throwError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiModels = 'https://viprahubbackend.herokuapp.com/uploadToMongo';
const apiUrl = 'https://viprahubbackend.herokuapp.com/api';

@Injectable()
export class ModelsService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  uploadModel(data): Observable<any> {
    return this.http.post(`${apiModels}/models`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllModels(): Observable<any> {
    console.log('inside get all models...');
    return this.http.get(`${apiModels}/models`, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getModelsBasedOnModelNameAndUserID(name: string, userID: string): Observable<any> {
    console.log('inside files service getmodelsonname' + name + ' ' + userID);
    return this.http.get(`${apiModels}/models?name=` + name + '&userID=' + userID, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getModelsBasedOnUserID(userID: string): Observable<any> {
    console.log('inside files service getModelsBasedOnUserID ' + userID);
    return this.http.get(`${apiModels}/models?userID=` + userID, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getModelsBasedOnExperiment(userID: string, experiment: string): Observable<any> {
    console.log('inside files service getModelsBasedOnExperiment ' + experiment + ' ' + userID);
    return this.http.get(`${apiModels}/models?experiment=` + experiment + '&userID=' + userID, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getAllModelsForUser(userID: string): Observable<any> {
    console.log('inside getAllModels ' + userID);
    return this.http.get(`${apiUrl}/getAllModels?userID=` + userID, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
