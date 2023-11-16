import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin/admin.service';
import { ListUser, Payment } from 'src/app/types/types.type';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  payments : Payment[] = []
  loading = true
  paymentListSubscription$ !: Subscription

  constructor(
    private _adminService: AdminService
  ) { }

  selectedFilter : string = "all"
  ngOnInit() {
    this.paymentListSubscription$ = this._adminService.getPayments().subscribe(
      (data) => {
        this.loading = false
        this.payments = data.data
      }
    )

  }


  status(payment: Payment): boolean {

    const expire = payment.memberShip.expire

    const timeDifference = this.getTimeDifference(payment.createdAt)
    const expireDate = expire * 24 * 60 * 60 * 1000;
    if (timeDifference <= expireDate) {
      return true;
    }
    return false;
  }

  getTimeDifference(value: Date): number {
    const createdAtDate = new Date(value);
    const currentDate = new Date();

    return currentDate.getTime() - createdAtDate.getTime();
  }

  ngOnDestroy(): void {
    this.paymentListSubscription$?.unsubscribe()
  }
}
