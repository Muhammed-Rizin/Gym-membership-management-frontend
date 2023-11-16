import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin/admin.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { Facility } from 'src/app/types/types.type';

@Component({
  selector: 'app-add-membership',
  templateUrl: './add-membership.component.html',
  styleUrls: ['./add-membership.component.css']
})
export class AddMembershipComponent implements OnInit, OnDestroy {
  form!: FormGroup
  facilities : Facility[] = []
  getFacilitiesSubscription$ !: Subscription
  addMemberShipSubscription$ !: Subscription
  loading : boolean = true
  is_submit = false

  constructor(
    private _formBuilder : FormBuilder,
    private _adminService : AdminService,
    private _notificationService : NotificationService,
    private _router : Router
  ){}

  ngOnInit() {
    this.form = this._formBuilder.group({
      rate: [null, Validators.required],
      operationHours: [null, Validators.required],
      expire: [null, Validators.required],
    })

    this.getFacilitiesSubscription$ = this._adminService.getFacilities().subscribe((data) => {
      this.facilities = data.data.map((facilityName) => ({_id: facilityName._id , facility: facilityName.facility, checked: false }));
      this.loading = false
    })
  }

  submit(){
    const data  = this.form.getRawValue()
    data.facilities = this.facilities.filter((item) => item.checked)
    if(this.form.valid && data.expire > 0 && data.operationHours > 0 && data.rate > 0){
      if(data.facilities.length){
        this.is_submit = true
        this.addMemberShipSubscription$ = this._adminService.addMemberShip(data).subscribe(
          ()=> {
            this._notificationService.showToast("Membership is added", false)
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
    this.addMemberShipSubscription$?.unsubscribe()
    this.getFacilitiesSubscription$?.unsubscribe()
  }
}
