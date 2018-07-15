import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { ConversationService } from '../../services/conversation.service';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-new-message',
  host: {
    "[style.display]": "'inline-block'",
    "[style.width.%]": "100",
    "[style.height.%]": "100",
  },
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  conversation: Conversation;
  subscription: any;
  message: string = "";
  constructor(
    private conversationService: ConversationService,
    private authService: AuthService) {
    this.subscription = this.conversationService.conversationChanged$.subscribe(c => {
      if (!c) return;
      this.conversation = c;
      this.message = c.draft;
    })
  }

  ngOnInit() {
  }

  onSend() {
    console.log(this.message)
    const message = new Message(this.message, this.authService.getCurrentUser(), this.conversation.user);
    this.conversationService.say(message);
    this.message = "";
    this.conversationService.saveConversationDraft("");
  }

  valueChanged() {
    this.conversationService.saveConversationDraft(this.message);
  }
}
