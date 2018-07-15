import { Component, OnInit, Input } from '@angular/core';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversation-list-item',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.css']
})
export class ConversationListItemComponent implements OnInit {

  constructor() { }

  @Input() conversation: Conversation;
  ngOnInit() {
  }

}
