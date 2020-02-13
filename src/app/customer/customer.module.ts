import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerService } from './customer.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
