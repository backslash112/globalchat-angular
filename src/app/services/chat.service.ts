import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
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
    this.socket.on('connect', () => {
      console.log(this.socket);
    });
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
}
