import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

// Componentes
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ErrorService } from './interceptors/error.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthRequestOptions } from './interceptors/auth.request';
import { AuthService } from './auth/auth.service';
import { LoginService } from './login/login.service';
import { AuthGuard } from './auth/auth.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BankService } from './bank/bank.service';
import { CustomerComponent } from './customer/customer.component';
import { AccountComponent } from './account/account.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      // FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthRequestOptions,
    LoginService,
    // BankService,
    
    ErrorService,
    {
      provide: ErrorHandler,
      useClass: ErrorService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestOptions,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
