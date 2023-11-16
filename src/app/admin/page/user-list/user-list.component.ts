import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin/admin.service';
import { ListUser, Payment } from 'src/app/types/types.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{
  users : ListUser[] = []
  filteredUsers : ListUser[] = []
  loading = true
  userListSubscription$ !: Subscription

  constructor(
    private _adminService: AdminService
  ) { }

  selectedFilter : string = "all"
  ngOnInit() {
    this.userListSubscription$ = this._adminService.userList().subscribe(
      (data) => {
        this.loading = false
        this.users = data.users
        this.filteredUsers = data.users
      }
    )

    this.selectFilter()
  }


  selectFilter(): void {
    if(this.selectedFilter == "active"){
      this.filteredUsers = this.users.filter(user => this.status(user))
    }else if (this.selectedFilter == "expired"){
      this.filteredUsers = this.users.filter(user => {
        if(this.userLatestPayment(user) &&!this.status(user)){
          return true
        }
        return false
      })
    }else if (this.selectedFilter == "no-purchase"){
      this.filteredUsers = this.users.filter(user => !this.userLatestPayment(user))
    }else {
      this.filteredUsers = this.users
    }
  }


  status(user: ListUser): boolean {
    const lastPayment= this.userLatestPayment(user)
    const expire = user.memberships[user.memberships.length - 1]?.expire

    const timeDifference = this.getTimeDifference(lastPayment.createdAt)
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

  userLatestPayment(user : ListUser) : Payment {
    return user.payments[user.payments.length - 1]
  }

  ngOnDestroy(): void {
    this.userListSubscription$?.unsubscribe()
  }
}
