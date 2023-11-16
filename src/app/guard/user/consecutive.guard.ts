import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsecutiveGuard implements CanActivate {
  constructor(
    private _router: Router
  ) { }
  canActivate() {
    const admin = localStorage.getItem('adminJwt');
    if (admin) {
      this._router.navigate(['/admin/users']);
      return false;
    } else {
      return true;
    }
  }
}
