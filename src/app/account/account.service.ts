import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../auth/url/url';
import { AccountType, SubAccount, Poliza} from './account.model';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private httpHeaders = new HttpHeaders();

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  constructor(private http: HttpClient) { }


  createSubAccount(object: SubAccount): Observable<SubAccount> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.post<SubAccount>(URL_SERVICIOS +
          '/api/account/addSubAccount', object, {headers: this.httpHeaders})
        
    }


    createPoliza(object: Poliza): Observable<Poliza> {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // url += '?token=' + this.token;
        return this.http.post<Poliza>(URL_SERVICIOS +
            '/api/poliza/addPoliza', object, {headers: this.httpHeaders})
          
      }
  

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
      return this.http.request(req)
      .pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      );
    }


    getAllAccounts(): Observable<AccountType[]> {
      console.log('GET ALL ACCOUNTS TYPE');
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<AccountType[]>(URL_SERVICIOS + '/api/account/getAllAccountsType', {headers: this.httpHeaders})
        // .pipe(
        //   map( obj => obj.filter(r => (r.subaccount.id !==null)[0]  )
        //   )
        // );
      
  
      }

      
    getAllSubAccounts(): Observable<SubAccount[]> {
      console.log('GET ALL ACCOUNTS TYPE');
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<SubAccount[]>(URL_SERVICIOS + '/api/account/getAllSubAccounts', {headers: this.httpHeaders})
      
  
      }

    
}
