import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginUser, MemberShip, NewPayment, Payment, RegisterUser, User } from 'src/app/types/types.type';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl

  constructor(
    private _http: HttpClient
  ) {}

  userLogin(data : LoginUser): Observable<User> {
    return this._http.post<User>(`${this.apiUrl}/user/login`, data, httpOptions)
  }

  userRegister(data : RegisterUser): Observable<User> {
    return this._http.post<User>(`${this.apiUrl}/user/register`, data, httpOptions)
  }

  getMemberShips(): Observable<{data : MemberShip[]}>{
    return this._http.get<{data : MemberShip[]}>(`${this.apiUrl}/user/memberships`, httpOptions)
  }

  paymentSuccess(data : NewPayment) {
    return this._http.post<{data : MemberShip}>(`${this.apiUrl}/user/payment`, {data}, httpOptions)
  }

  getPayments() : Observable<{data : Payment[]}>{
    return this._http.get<{data : Payment[]}>(`${this.apiUrl}/user/get_user_payments`, httpOptions)
  }

  getUserDetails(token : string): Observable<{data : User}> {
    return this._http.get<{data : User}>(`${this.apiUrl}/user/user_details?token=${token}`, httpOptions)
  }
}
