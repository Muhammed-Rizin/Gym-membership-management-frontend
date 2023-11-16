import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './page/register/register.component';
import { ConsecutiveGuard } from '../guard/user/consecutive.guard';
import { UnAuthGuard } from '../guard/user/unauth.guard';
import { AuthGuard } from '../guard/user/auth.guard';
import { PaymentsComponent } from './page/payments/payments.component';
import { ErrorComponent } from '../error/400/error/error.component';
import { ServerErrorComponent } from '../error/500/server-error/server-error.component';
import { ServerErrorGuard } from '../guard/user/error.guard';

const routes: Routes = [
  {path : '', component : HomeComponent, canActivate : [ConsecutiveGuard]},
  {path : 'login', component : LoginComponent, canActivate :[ConsecutiveGuard, UnAuthGuard]},
  {path : 'register', component : RegisterComponent, canActivate:[ConsecutiveGuard, UnAuthGuard]},
  {path : 'payments', component : PaymentsComponent, canActivate:[ConsecutiveGuard, AuthGuard]},
  {path : 'server-error', component : ServerErrorComponent, canActivate:[ServerErrorGuard]},
  {path : '**', pathMatch: 'full', component : ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
