import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { UserListComponent } from './page/user-list/user-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './page/side-bar/side-bar.component';
import { MembershipComponent } from './page/membership/membership.component';
import { AddMembershipComponent } from './page/add-membership/add-membership.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { EditMembershipComponent } from './page/edit-membership/edit-membership.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PaymentsComponent } from './page/payments/payments.component';



@NgModule({
  declarations: [
    LoginComponent,
    UserListComponent,
    SideBarComponent,
    MembershipComponent,
    AddMembershipComponent,
    EditMembershipComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule
  ],
  exports : [RouterModule]
})
export class AdminModule { }
