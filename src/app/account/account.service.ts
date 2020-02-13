import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private httpHeaders = new HttpHeaders();


  constructor(private http: HttpClient) { }

     // .pipe( map(response => response as AccountType[]))
    // Otra opcion para mandar file
    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
      formdata.append('file', file);
      console.log('FORM DATA ', formdata);

      const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/accounting-type-file', formdata,  {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
      /* .pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      ); */
    }

    
}
