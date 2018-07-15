import { Component, OnInit, OnDestroy } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { ConversationService } from '../../services/conversation.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-conversation-user',
  templateUrl: './conversation-user.component.html',
  styleUrls: ['./conversation-user.component.css']
})
export class ConversationUserComponent implements OnInit, OnDestroy {
  conversation: Conversation;
  subscription: any;
  constructor(private conversationService: ConversationService) {
    
    this.subscription = this.conversationService.conversationChanged$.subscribe(c => {
      if (!c) return;
      this.conversation = c;
    })
   }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
