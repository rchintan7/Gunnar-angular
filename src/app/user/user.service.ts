import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'api/authorization';

  constructor(private http: HttpClient) {}

  checkPasswordOnServerAsync(password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { Password: password })
      .pipe(
        map(response => ({ data: response })),
        catchError(this.handleError)
      );
  }

  logOutUserAsync(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {})
      .pipe(
        map(response => ({ data: response })),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle error logic here
    return throwError(error);
  }
}
