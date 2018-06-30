import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost/chat';
  private socket;
  constructor() { 
    this.socket = io(this.url);
    this.socket.on('msg', data => {
      
    })
  }

  public getUnread() {

  }

  public send(msg: string, receiver: string) {
    console.log(`send message: (${msg}) to: (${receiver}`)
    this.socket.emit('msg', {
      receiver: receiver,
      msg: msg
    })
  }

  public listen(callback) {
    this.socket.on('msg', data => {
      callback(data);
    })
  }
}
