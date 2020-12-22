import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { List } from './lista';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getList(): Observable<List> {
    return this.http
      .get<List>(this.apiURL + '/list')
      .pipe(tap(console.log), retry(1), catchError(this.handleError));
  }

  getItem(id): Observable<List> {
    return this.http
      .get<List>(this.apiURL + '/list/' + id)
      .pipe(tap(console.log), retry(1), catchError(this.handleError));
  }

  createItem(item): Observable<List> {
    return this.http
      .post<List>(this.apiURL + '/list', JSON.stringify(item), this.httpOptions)
      .pipe(tap(console.log), retry(1), catchError(this.handleError));
  }

  deleteItem(id) {
    return this.http
      .delete<List>(this.apiURL + '/list/' + id, this.httpOptions)
      .pipe(tap(console.log), retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
