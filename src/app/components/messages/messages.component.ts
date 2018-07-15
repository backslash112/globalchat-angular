import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  messages: Array<Message> = new Array();
  subscription: any;
  constructor(private conversationService: ConversationService) {
    this.subscription = this.conversationService.conversationChanged$.subscribe(c => {
      if (!c) return;
      this.messages = c.history;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
