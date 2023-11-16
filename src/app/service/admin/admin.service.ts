import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLogin, Facilities, ListUser, MemberShip, Payment } from 'src/app/types/types.type';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.apiUrl

  constructor(
    private _http: HttpClient
  ) {}

  adminLogin(data : AdminLogin): Observable<{token : string}> {
    return this._http.post<{token : string}>(`${this.apiUrl}/admin/login`, data, httpOptions)
  }

  userList() : Observable<{users : ListUser[]}>{
    return this._http.get<{users : ListUser[]}>(`${this.apiUrl}/admin/users`, httpOptions)
  }

  addField(data : string) : Observable<{message : string}>{
    return this._http.post<{message : string}>(`${this.apiUrl}/admin/add_facility`, {data}, httpOptions)
  }

  getFacilities() : Observable<{data : Facilities[]}>{
    return this._http.get<{data : Facilities[]}>(`${this.apiUrl}/admin/facilities`, httpOptions)
  }

  addMemberShip(data : MemberShip) : Observable<{message : string}>{
    return this._http.post<{message : string}>(`${this.apiUrl}/admin/add_membership`, {data}, httpOptions)
  }

  getMemberShips():Observable<{data : MemberShip[]}> {
    return this._http.get<{data : MemberShip[]}>(`${this.apiUrl}/admin/memberships`, httpOptions)
  }

  getMemberShipDetails(id: string) : Observable<{data : MemberShip}>{
    return this._http.get<{data : MemberShip}>(`${this.apiUrl}/admin/membership_detail?id=${id}`, httpOptions)
  }

  editMemberShip(data : MemberShip) : Observable<{message : string}>{
    return this._http.patch<{message : string}>(`${this.apiUrl}/admin/edit_membership`, {data}, httpOptions)
  }

  getPayments() : Observable<{data : Payment[]}> {
    return this._http.get<{data : Payment[]}>(`${this.apiUrl}/admin/payments`, httpOptions)

  }
}
