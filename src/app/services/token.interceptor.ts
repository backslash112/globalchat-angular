import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private user: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('TokenInterceptor.intercept() called!')
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.user.getCurrentToken()}`
      }
    });
    return next.handle(request);
  }
}