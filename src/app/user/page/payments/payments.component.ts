import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';
import { Payment } from 'src/app/types/types.type';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy{
  payments: Payment[] = []
  loading: boolean = true
  expire !: Date
  token = localStorage.getItem('userJwt') || ''
  getPaymentsSubscription$ !: Subscription

  constructor(
    private _userService : UserService
  ){}

  ngOnInit() {
    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    this.getPaymentsSubscription$ = this._userService.getPayments().subscribe((data)=> {
      this.payments = data.data
      const current = new Date(data.data[0]?.createdAt).getTime()
      this.expire = new Date(current + thirtyDaysInMilliseconds)
      this.loading = false
    })
  }

  status(value: Date, expire : number): boolean {
    const createdAtDate = new Date(value);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const expireDate = expire * 24 * 60 * 60 * 1000;

    if (timeDifference <= expireDate) {
        return true;
    }
    return false; 
  }

  ngOnDestroy(): void {
      this.getPaymentsSubscription$?.unsubscribe()
  }
}
