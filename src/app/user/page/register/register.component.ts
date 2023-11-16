import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/types/types.type';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  registerForm!: FormGroup;
  registerSubscription$ !: Subscription

  characters : boolean = false
  lowerCase : boolean = false
  upperCase : boolean = false
  oneNumber : boolean = false

  loading : boolean = false

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _notificationService : NotificationService,
  ) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    const data: RegisterUser = this.registerForm.getRawValue();
    if(this.registerForm.valid){
      if(this.characters && this.lowerCase && this.upperCase && this.oneNumber){
        this.loading = true
        this.registerSubscription$ = this._userService.userRegister(data).subscribe(
          (data) => {
            localStorage.setItem('userJwt', data.token);
            this._router.navigate(['/']);
            this.loading = false
          },
          (err) => {
            this._notificationService.showToast(err.error.message, true)
            this.loading = false
          }
        )
      }else {
        this._notificationService.showToast("Password must be strong", true)
      }
    }else {
      this._notificationService.showToast("All fields are required", true)
    }
  }

  ngOnDestroy(): void {
      this.registerSubscription$?.unsubscribe()
  }

  passwordCheck(){
    const password = this.registerForm.value.password

    if (password.length > 7) {
      this.characters = true
    }else {
      this.characters = false
    }
    if (/[A-Z]/.test(password)) {
      this.upperCase = true
    }else {
      this.upperCase = false
    }
    if (/[a-z]/.test(password)) {
      this.lowerCase = true
    }else {
      this.lowerCase = false
    }
    if (/\d/.test(password)) {
      this.oneNumber = true
    }else {
      this.oneNumber = false
    }
  }
}
