import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin/admin.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { Facilities, Facility, MemberShip } from 'src/app/types/types.type';

@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.css']
})
export class EditMembershipComponent implements OnInit, OnDestroy{
  facilities: Facility[] = []
  id: string 
  membership !: MemberShip
  loading: Boolean = true

  getMemberShipDetailsSubscription$!: Subscription
  getFacilitiesSubscription$!: Subscription
  editMemberShipSubscription$!: Subscription

  constructor(
    private _adminService: AdminService,
    private _route: ActivatedRoute,
    private _notificationService : NotificationService,
    private _router : Router
  ) {
    this.id = this._route.snapshot.paramMap.get('id') || ""
  }

  ngOnInit() {
    let totalFacilities: Facilities[] = []
    this.getMemberShipDetailsSubscription$ = this._adminService.getMemberShipDetails(this.id as string).subscribe(
      (data) => {
        this.membership = data.data
        totalFacilities = data.data.facilities
        this.getFacilitiesSubscription$ = this._adminService.getFacilities().subscribe((data) => {
          this.facilities = data.data.map((facilityName) => 
          ({ _id: facilityName._id, facility: facilityName.facility, checked: totalFacilities.some(f => f._id === facilityName._id) }));
          this.loading = false
        })
      },
      (err) => {
        if(err.status == 404){
          this._router.navigate(['/admin/membership'])
        }
      })

  }

  submit() {
    if(this.membership.expire > 0 && this.membership.operationHours > 0 && this.membership.rate > 0){
      this.membership.facilities = this.facilities.filter((item) => item.checked)
      if(this.membership.facilities.length){
        this.editMemberShipSubscription$ = this._adminService.editMemberShip(this.membership).subscribe(
          ()=> {
            this._notificationService.showToast('Changes saved', false)
            this._router.navigate(['/admin/membership'])
          }
        )
      }else {
        this._notificationService.showToast("Facilities is required", true)
      }
    }else {
      this._notificationService.showToast("All fields are required", true)
    }
  }

  ngOnDestroy(): void {
    this.getFacilitiesSubscription$?.unsubscribe()
    this.getMemberShipDetailsSubscription$?.unsubscribe()
    this.editMemberShipSubscription$?.unsubscribe()
  }
}
