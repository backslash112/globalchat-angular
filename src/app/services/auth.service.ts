import { server } from '../../config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
// import { store, SetApplicationActions } from '../jobs/myApplicationsState';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'app_token';
  private userKey: string = 'user';
  private currentToken: string = '';
  private currentUser: User;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private getUrl(router: string): string {
    return server.host + ":" + server.port + router;
  }

  private storeToken(content: string) {
    localStorage.setItem(this.tokenKey, JSON.stringify(content));
  }

  private storeUser(user: Object) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public signUp(user) {
    return this.http.post(this.getUrl("/users"), user);
  }

  public signIn(userName: string, password: string): Observable<{ err: Error, user: Object }> {
    console.log('userName: ' + userName);
    console.log('password: ' + password);
    console.log(this.getUrl('/sessions'))
    return new Observable(observer => {
      const req = this.http.post(this.getUrl('/sessions'), {
        userName: userName,
        password: password
      }).subscribe(res => {
        console.log('res:')
        console.log(res);
        if (res.hasOwnProperty('token')) {
          this.storeToken(res['token']);
        }
        if (res.hasOwnProperty('data')) {
          // console.log('data:');
          this.storeUser(res['data']);
          console.log(res['data']);
          observer.next(res['data']);
        }

        this.loggedIn.next(true);

      }, err => {
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
  }

  public signOut(): void {
    this.currentToken = null;
    this.currentUser = null;
    localStorage.clear();
    this.loggedIn.next(false);
  }

  public getCurrentToken() {
    if (!this.currentToken)
      this.currentToken = localStorage.getItem(this.tokenKey);
    return this.currentToken;
  }

  public getCurrentUser() {
    if (!this.currentUser)
      this.currentUser = JSON.parse(localStorage.getItem(this.userKey));
    return this.currentUser;
  }
}