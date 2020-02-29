import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BankService} from '../services/service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  providers: [BankService]
})
export class ServiceModule { }
