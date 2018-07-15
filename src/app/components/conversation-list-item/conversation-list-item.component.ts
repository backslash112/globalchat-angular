import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-conversation-list-item',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.css']
})
export class ConversationListItemComponent implements OnInit {

  constructor() { }

  @Input() user: User;
  ngOnInit() {
  }

}
