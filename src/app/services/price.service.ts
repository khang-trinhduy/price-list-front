import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PriceService {
  httpHeaderOptions = new HttpHeaders({
    "Content-type": "application/json"
  });

  constructor(private http: HttpClient) {}

  getProvinces = (): Observable<any> => {
    return this.http
      .get(`${environment.api}/provinces`, {
        headers: this.httpHeaderOptions
      })
      .pipe(catchError(this.handleError<any>("GET PROVINCES")));
  };

  getCars = (): Observable<any> => {
    return this.http
      .get(`${environment.api}/cars`, { headers: this.httpHeaderOptions })
      .pipe(catchError(this.handleError<any>("GET CARS")));
  };

  post = (model): Observable<any> => {
    return this.http
      .post(`${environment.api}/prices`, model, {
        headers: this.httpHeaderOptions
      })
      .pipe(catchError(this.handleError<any>("CREATE PRICE")));
  };

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
