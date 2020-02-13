import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';
import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankItemComponent } from './bank-list/bank-item/bank-item.component';
import { AddBankaccountComponent } from './add-bankaccount/add-bankaccount.component';
import { BankService } from './bank.service';
import { BankTransactionComponent } from './bank-transaction/bank-transaction.component';


@NgModule({
  declarations: [BankComponent,BankDetailComponent,BankListComponent,BankItemComponent, AddBankaccountComponent, BankTransactionComponent],
  imports: [
    CommonModule,
     // FormsModule,
    ReactiveFormsModule,
    BankRoutingModule
  ],
  providers: [
    BankService
  ]
})
export class BankModule { }
