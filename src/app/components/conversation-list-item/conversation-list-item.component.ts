import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversation-list-item',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.css']
})
export class ConversationListItemComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() conversation: Conversation;
  unreadMessageCount = 0;
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ConversationListItemComponent onChangeds')
    const conversation: SimpleChange = changes.conversation;
    console.log(`${conversation.previousValue} -> ${conversation.currentValue}: ${conversation.currentValue.history.length}`);
    this.unreadMessageCount = this.conversation.history.filter(m => !m.isRead).length;
  }
}