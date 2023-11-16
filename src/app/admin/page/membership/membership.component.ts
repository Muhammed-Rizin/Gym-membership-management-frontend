import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin/admin.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { MemberShip } from 'src/app/types/types.type';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit, OnDestroy{
  memberShips: MemberShip[] = []
  loading : boolean = true 
  isSubmit = false

  addFacility : boolean = false
  facility !: string
  getMemberShipSubscription$ !: Subscription
  addFieldSubscription$ !: Subscription

  constructor(
    private _adminService : AdminService,
    private _notificationService : NotificationService
  ){}
  ngOnInit() {
    this.getMemberShipSubscription$ = this._adminService.getMemberShips().subscribe(
      (data) => {
        this.memberShips = data.data
        this.loading = false
      },
      
    )
  }

  submit(){
    if(this.facility.trim()){
      this.isSubmit = true
      this.addFieldSubscription$ = this._adminService.addField(this.facility).subscribe(
        () => {
          this._notificationService.showToast('Facility added', false)
          this.addFacility = false
          this.isSubmit = false
        }
      )
    }else {
      this._notificationService.showToast('Field is required', true)
    }
  }

  ngOnDestroy(): void {
    this.addFieldSubscription$?.unsubscribe()
    this.getMemberShipSubscription$?.unsubscribe()
  }
}
