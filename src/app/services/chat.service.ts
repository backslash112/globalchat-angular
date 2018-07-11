import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://0.0.0.0:8080/chat';
  private socket;
  constructor() { 
    this.socket = io.connect(this.url);
    this.socket.on('connectw', () => {
      console.log(this.socket);
    });
  }

  public send(message: Message, reciever: User) {
    console.log(`send message: (${message.text}) to: ${reciever.email}`)
    this.socket.emit('send_msg', {
      to: reciever.email,
      message: message
    })
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('new_msg', data => {
        observer.next(data);
      });
    });
  }
}
