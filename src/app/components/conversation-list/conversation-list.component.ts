import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { ConversationService } from '../../services/conversation.service';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit, OnDestroy {

  conversationList: Array<Conversation> = new Array();
  currentconversation: Conversation;
  subscription1: any;
  subscription2: any;
  constructor(private conversationService: ConversationService) {
    this.subscription1 = this.conversationService.conversationChanged$.subscribe(c => {
      this.currentconversation = c;
    });

    this.subscription2 = this.conversationService.conversationListChanged$.subscribe(cl => {
      this.conversationList = cl;
    });
   }

  ngOnInit() {
  }

  onSwitchConversation(item: Conversation) {
    this.conversationService.switchConversation(item);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
