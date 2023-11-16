import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin/admin.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { AdminLogin } from 'src/app/types/types.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm !: FormGroup
  constructor(
    private _formBuilder : FormBuilder,
    private _adminService : AdminService,
    private _router: Router,
    private _notificationService : NotificationService
  ){}

  loginSubscription$ !: Subscription
  loading : boolean = false

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email : ['', Validators.required],
      password : ['', [Validators.required]]
    })
  }

  submit(){
    if(this.loginForm.valid){
      const data : AdminLogin = this.loginForm.getRawValue()
      this.loading = true
      this.loginSubscription$ = this._adminService.adminLogin(data).subscribe(
        (data) => {
          localStorage.setItem('adminJwt', data.token)
          this._router.navigate(['/admin/users'])
        },
        (err)=> {
          this._notificationService.showToast(err.error.message, true)
          this.loading = false
        }
      )
    } else {
      this._notificationService.showToast("All fields are required", true)
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription$?.unsubscribe()
  }
}
