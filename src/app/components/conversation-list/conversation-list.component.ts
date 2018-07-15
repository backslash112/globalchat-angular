import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {

  users: User[];
  currentUser: User;
  constructor() { }

  ngOnInit() {
    this.users = [];
    Array.from(Array(10), (val, index) => {
      this.users.push(new User('user' + index));
    });

    this.currentUser = this.users[0];
  }

}
