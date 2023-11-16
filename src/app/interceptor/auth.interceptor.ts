import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _router :Router
  ) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('/admin')){
      const token = localStorage.getItem('adminJwt')
      request = request.clone({headers : request.headers.set('authorization', 'Bearer ' + token)})
      return next.handle(request).pipe(
        tap(
          (event : HttpEvent<any>)=>{
          },
          (error : any) => {
            if(error instanceof HttpErrorResponse){
              if(error.status === 401){
                localStorage.removeItem('adminJwt')
                this._router.navigate(['/admin'])
              }else if(error.status == 500) {
                localStorage.setItem('server-error' , 'server-error')
                this._router.navigate(['/admin/server-error'])
              }
            }
          } 
        )
      )
    }else {
      const token = localStorage.getItem('userJwt')
      request = request.clone({headers : request.headers.set('authorization', 'Bearer ' + token)})
      return next.handle(request).pipe(
        tap(
          (event : HttpEvent<any>)=>{},
          (error : any) => {
            if(error instanceof HttpErrorResponse){
              if(error.status === 401){
                localStorage.removeItem('userJwt')
                this._router.navigate(['/login'])
              }else if(error.status == 500) {
                localStorage.setItem('server-error' , 'server-error')
                this._router.navigate(['/server-error'])
              }
            }
          } 
        )
      )
    }
  }
}
