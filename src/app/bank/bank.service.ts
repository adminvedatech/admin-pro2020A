import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Bank, BankTransaction } from './bank.model';
import { Observable, Subject } from 'rxjs';
import { URL_SERVICIOS } from '../auth/url/url';
import { tap, map, filter } from 'rxjs/operators';
import { SubAccount } from '../account/account.model';


@Injectable({
  providedIn: 'root'
})
export class BankService {

  url = URL_SERVICIOS;
  api = "api/bank/getBankAccountById";

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  createBankAccount(object: Bank): Observable<Bank[]> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
      // url += '?token=' + this.token;
      return this.http.post<Bank[]>(URL_SERVICIOS +
          '/api/bank/add/', object, {headers: this.httpHeaders})
        
    }

    getAllBanks(): Observable<Bank[]> {
      console.log('GET ALL ACCOUNTS TYPE');
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<Bank[]>(URL_SERVICIOS + '/api/bank/getAllBankAccounts', {headers: this.httpHeaders})
      
  
      }

      getAllBanksTransaction(): Observable<BankTransaction[]> {
        console.log('GET ALL ACCOUNTS TYPE');
         this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
          return this.http.get<BankTransaction[]>(URL_SERVICIOS + '/api/dto/getAllBankTransaction', {headers: this.httpHeaders})
          .pipe(
            map( obj => obj.filter(r => r.retiros > 0)
            )
          );
        
    
        }

      getBankById(id: number): Observable<Bank> {
        console.log('GET ALL ACCOUNTS TYPE');
         this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
          return this.http.get<Bank>(`${URL_SERVICIOS}/${this.api}/${id}`,  {headers: this.httpHeaders})
    
    
        }

        updateBankAccount(data: Bank): Observable<Bank> {
          // console.log('Token', this.token);
    
        this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
          // url += '?token=' + this.token;
          return this.http.put<Bank>(`${URL_SERVICIOS}/"api/bank/update"`, data, {headers: this.httpHeaders});
          // .pipe(
          //   map(response => response as BankAccount));
        }

        

     // .pipe( map(response => response as AccountType[]))
    // Otra opcion para mandar file
    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
      formdata.append('file', file);
      console.log('FORM DATA ', formdata);

      const req = new HttpRequest('POST', 'http://localhost:8080/api/upload/bank-transaction-file', formdata,  {
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


         
    getAllSubAccounts(): Observable<SubAccount[]> {
      console.log('GET ALL ACCOUNTS TYPE');
       this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<SubAccount[]>(URL_SERVICIOS + '/api/account/getAllSubAccounts', {headers: this.httpHeaders})
      
  
      }
  

 
}
