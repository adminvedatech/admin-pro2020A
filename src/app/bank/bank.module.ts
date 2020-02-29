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
import { AccountService } from '../account/account.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TransactionListComponent } from './bank-transaction/transaction-list/transaction-list.component';
import { TransactionItemComponent } from './bank-transaction/transaction-list/transaction-item/transaction-item.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [BankComponent,
  BankDetailComponent,
  BankListComponent,
  BankItemComponent,
  AddBankaccountComponent,
  BankTransactionComponent,
  TransactionListComponent,
  TransactionItemComponent,
],
  imports: [
    CommonModule,
     // FormsModule,
    NgxMaskModule.forRoot(options),
    ReactiveFormsModule,
    BankRoutingModule
  ],
  
  providers: [
    BankService,
    AccountService
  ]
})
export class BankModule { }
