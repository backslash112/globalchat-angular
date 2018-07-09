import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { User } from './models/user.model';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
   
  }

  sendClicked() {
    const message = new Message("hi, there!");
    const user = new User("user2@gmail.com");
    this.chatService.send(message, user);
  }
}
