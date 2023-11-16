import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { LoginComponent } from './page/login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './page/home/home.component';
import { NavBarComponent } from './page/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './page/register/register.component';
import { PaymentsComponent } from './page/payments/payments.component';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    RegisterComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers : [],
  exports : [RouterModule]
})
export class UserModule { }
