import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';
import { MemberShip, Payment, User } from 'src/app/types/types.type';
import { environment } from 'src/environments/environment';
declare let Razorpay : any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(
    private _userService : UserService,
    private _router : Router
  ){}
  token = localStorage.getItem('userJwt') || ''
  memberShips : MemberShip[] = []
  userData !: User
  lastPayment : boolean = true
  loading: boolean = true

  newPaymentSubscription$ !: Subscription
  getMemberShipSubscription$ !: Subscription
  getUserSubscription$ !: Subscription
  getPaymentSubscription$ !: Subscription

  ngOnInit(){
    this.getMemberShipSubscription$ = this._userService.getMemberShips().subscribe((data) => {
      this.memberShips = data.data
    })
    this.getUserSubscription$ = this._userService.getUserDetails(this.token).subscribe((data) => {
      this.userData = data.data
      if(this.userData){
        this.getPaymentSubscription$ = this._userService.getPayments().subscribe((data) => {
          if(data.data?.length){
            this.lastPayment = 
            this.status(data.data[data.data.length -1].createdAt, data.data[data.data.length -1].memberShip.expire)
          }else {
            this.lastPayment = false
          }
        })
      }
      this.loading = false
    })
  }

  status(value: Date, expire : number): boolean {
    const createdAtDate = new Date(value);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const oneWeekInMilliSecond = expire * 24 * 60 * 60 * 1000;
    if (timeDifference <= oneWeekInMilliSecond) {
        return true;
    }
    return false; 
  }

  paymentSubmit(membership : MemberShip) {
    const amount = membership.rate
    const user = localStorage.getItem('userJwt') || ''
    
    const options = {
      key: environment.razorpayKey,
      amount: amount as number * 100,
      currency: 'INR',
      name: 'Armando',
      description: 'Registration Fee',
      image:'https://e7.pngegg.com/pngimages/240/627/png-clipart-gym-logo-mark-gym.png',
      handler: (response: any) => {
        if (response.razorpay_payment_id) {
          this.newPaymentSubscription$ = this._userService.paymentSuccess({amount : amount as number, user , membership : membership._id, paymentId : response.razorpay_payment_id})
          .subscribe(
            (data) => {
              this._router.navigate(['/payments'])
            },
          )
        } else {
        }
      }
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }

  ngOnDestroy(): void {
    this.getMemberShipSubscription$?.unsubscribe()
    this.getUserSubscription$?.unsubscribe()
    this.newPaymentSubscription$?.unsubscribe()
  }
}
