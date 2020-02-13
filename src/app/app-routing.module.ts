import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'account',
  // component: BanksComponent
  loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
   canActivate: [AuthGuard] 
  },
  { path: 'bank',
  // component: BanksComponent
  loadChildren: () => import('./bank/bank.module').then(m => m.BankModule),
   canActivate: [AuthGuard] 
  },
  { path: 'customer',
  // component: BanksComponent
  loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
   canActivate: [AuthGuard] 
  },
 
  { path: 'login',
  component: LoginComponent
  },
  {   
    path: '**', pathMatch: 'full', redirectTo: '/'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
