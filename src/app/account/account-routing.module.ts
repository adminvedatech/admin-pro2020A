import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { SubaccountComponent } from './subaccount/subaccount.component';
import { SubaccountListComponent } from './subaccount-list/subaccount-list.component';
import { AddAccountingPolicyComponent } from './add-accounting-policy/add-accounting-policy.component';

const routes: Routes = [
  {
    path: 'add-account',
    component: AccountComponent
  },
  {
    path: 'add-subaccount',
    component: SubaccountComponent
  },
  {
    path: 'subaccount-list',
    component: SubaccountListComponent
  },
  {
    path: 'add-accounting-policy',
    component: AddAccountingPolicyComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
