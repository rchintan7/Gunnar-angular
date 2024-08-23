import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  constructor(private http: HttpClient) {}

  private defaultHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': '*',
      'Authorization': `Bearer ${token}`
    });
  }

  getHelper<T>(url: string, token: string): Observable<T> {
    const headers = this.defaultHeaders(token);
    return this.http.get<T>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  postHelper<T>(url: string, request: any, token: string): Observable<T> {
    const headers = this.defaultHeaders(token);
    return this.http.post<T>(url, request, { headers })
      .pipe(catchError(this.handleError));
  }

  postImageHelper<T>(url: string, formData: FormData, token: string): Observable<T> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<T>(url, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  putHelper<T>(url: string, request: any, token: string): Observable<T> {
    const headers = this.defaultHeaders(token);
    return this.http.put<T>(url, request, { headers })
      .pipe(catchError(this.handleError));
  }

  patchHelper<T>(url: string, request: any, token: string): Observable<T> {
    const headers = this.defaultHeaders(token);
    return this.http.patch<T>(url, request, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteHelper<T>(url: string, token: string): Observable<T> {
    const headers = this.defaultHeaders(token);
    return this.http.delete<T>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    // Handle error logic here
    return throwError(error);
  }
}
