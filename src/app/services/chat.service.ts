import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { server } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://192.168.1.17:8080/chat';
  private socket;
  constructor(
    private authService: AuthService,
    private http: HttpClient) {
    this.socket = io.connect(this.url);
    this.socket.on('connect', () => {
      // console.log(this.socket);
      this.join();
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect from server!');
    })

  }

  public join() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.socket.emit('join', user);
    }
  }

  public leave() {
    console.log('leave()')
    const user = this.authService.getCurrentUser();
    if (user) {
      console.log('emit leave')
      this.socket.emit('leave', user);
    }
  }

  public send(message: Message) {
    this.socket.emit('send_message', message)
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('new_message', message => {
        console.log(`new_message: ${message.from.email}: '${message.text}'`)
        console.dir()
        observer.next(message);
      });
    });
  }

  public onNewUserLoggedIn(): Observable<User> {
    return new Observable<User>(observer => {
      this.socket.on('joined', user => {
        let currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
          return;
        }
        console.dir(user);
        console.log(`${user.email} joined`)
        // console.dir(data.user);
        if (user.email != this.authService.getCurrentUser().email) {
          observer.next(user);
        }
      });
    });
  }

  public onUserLoggedOut(): Observable<User> {
    return new Observable<User>(observer => {
      this.socket.on('leaved', data => {
        if (!this.authService.getCurrentUser()) {
          return;
        }
        observer.next(data);
      });
    });
  }

  private getUrl(router: string): string {
    return server.host + ":" + server.port + router;
  }

  public getOnlineUsers(): Observable<Array<User>> {
    return new Observable(observer => {
      this.http.get(this.getUrl("/chats/online-users"))
        .subscribe(
          res => {
            observer.next(res["data"]);
          })
    });
  }
}
