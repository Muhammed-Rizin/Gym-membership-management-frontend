import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { UserListComponent } from './page/user-list/user-list.component';
import { ConsecutiveGuard } from '../guard/admin/consecutive.guard';
import { UnAuthGuard } from '../guard/admin/unauth.guard';
import { AuthGuard } from '../guard/admin/auth.guard';
import { MembershipComponent } from './page/membership/membership.component';
import { AddMembershipComponent } from './page/add-membership/add-membership.component';
import { EditMembershipComponent } from './page/edit-membership/edit-membership.component';
import { ServerErrorComponent } from '../error/500/server-error/server-error.component';
import { ErrorComponent } from '../error/400/error/error.component';
import { ServerErrorGuard } from '../guard/admin/error.guard';
import { PaymentsComponent } from './page/payments/payments.component';

const routes: Routes = [
  {path : '', component : LoginComponent, canActivate: [ConsecutiveGuard, UnAuthGuard]},
  {path : 'users', component : UserListComponent, canActivate: [ConsecutiveGuard, AuthGuard]},
  {path : 'membership', component : MembershipComponent, canActivate: [ConsecutiveGuard, AuthGuard]},
  {path : 'membership/add', component : AddMembershipComponent, canActivate: [ConsecutiveGuard, AuthGuard]},
  {path : 'edit/:id', component : EditMembershipComponent, canActivate: [ConsecutiveGuard, AuthGuard]},
  {path : 'payments', component : PaymentsComponent, canActivate: [ConsecutiveGuard, AuthGuard]},
  {path : 'server-error', component : ServerErrorComponent, canActivate:[ServerErrorGuard]},
  {path : '**', pathMatch: 'full', component : ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
