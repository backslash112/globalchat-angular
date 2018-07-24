import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://0.0.0.0:8080/chat';
  private socket;
  constructor(private authService: AuthService) {
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
    this.socket.emit('send_message', {
      from: message.from.email,
      to: message.to.email,
      message: message.text
    })
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('new_message', data => {
        observer.next(data);
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
}
