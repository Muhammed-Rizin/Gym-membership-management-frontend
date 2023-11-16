import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/types/types.type';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm !: FormGroup
  loginSubscription$ !: Subscription
  loading : boolean = false

  constructor(
    private _formBuilder : FormBuilder,
    private _userService : UserService,
    private _router: Router,
    private _notificationService : NotificationService
  ){}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email : ['', Validators.required],
      password : ['', [Validators.required]]
    })
  }

  submit(){
    if(this.loginForm.valid){
      this.loading = true
      const data : LoginUser = this.loginForm.getRawValue()
      this.loginSubscription$ = this._userService.userLogin(data).subscribe(
        (data) => {
          localStorage.setItem('userJwt', data.token)
          this._router.navigate(['/'])
        },
        (err) => {
          this._notificationService.showToast(err.error.message, true)
          this.loading = false
        }
      )
    }else {
      this._notificationService.showToast("All fields are required", true)
    }
  } 


  ngOnDestroy(): void {
    this.loginSubscription$?.unsubscribe()  
  }
}
