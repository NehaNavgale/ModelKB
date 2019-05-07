import { Injectable } from '@angular/core';
import {throwError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const httpImageOptions = {
  headers: new HttpHeaders({'Content-Type': 'image/jpeg'})
};

const apiFiles = 'https://viprahubbackend.herokuapp.com/uploadToMongo/files';
const apiChunks = 'https://viprahubbackend.herokuapp.com/uploadToMongo/chunks';

@Injectable()
export class FilesService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: `);
      console.error(error.error);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  downloadPDF(filename, filetype): any {
    return this.http.get(`${apiFiles}` + filename, httpOptions).pipe(
      catchError(this.handleError));
  }

  showFileNames(): Observable<any> {
    console.log('files service inside');
    return this.http.get(`${apiFiles}`, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getFileBasedOnFileReferenceId(fileReferenceID: any): Observable<any> {
    console.log('inside files service based on filereferenceID' + `${apiFiles}/${fileReferenceID}`);
    return this.http.get(`${apiFiles}/${fileReferenceID}`, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getChunkBasedOnFileId(fileName: any): Observable<any> {
    console.log('inside files service based on getChunkBasedOnFileId' + `${apiChunks}/${fileName}`);
    return this.http.get(`${apiChunks}/${fileName}`, {responseType: 'blob'});
  }
}
