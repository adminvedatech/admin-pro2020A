import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from './bank.component';
import { AddBankaccountComponent } from './add-bankaccount/add-bankaccount.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankTransactionComponent } from './bank-transaction/bank-transaction.component';


const routes: Routes = [
  {
    path: '',
    component: BankComponent
  },
  {
    path: 'add-bankaccount',
    component: AddBankaccountComponent
  },
  {
    path: 'bank-list',
    component: BankListComponent
  },
  {
    path: 'add-banktransaction',
    component: BankTransactionComponent
  },
  {
    path: 'edit/:id',
    component: AddBankaccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
