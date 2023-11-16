import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(
    private _router : Router
  ){}
  canActivate() {
    const token = localStorage.getItem('userJwt');
    if (token) {
        this._router.navigate(['/']);
        return false;
    } else {
        return true;
    }
}
}
