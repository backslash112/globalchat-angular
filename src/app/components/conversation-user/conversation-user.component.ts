import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-conversation-user',
  templateUrl: './conversation-user.component.html',
  styleUrls: ['./conversation-user.component.css']
})
export class ConversationUserComponent implements OnInit {
  user: User;
  constructor() { }
  
  ngOnInit() {
    this.user = new User("user8");
  }

}
