import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-new-message',
  host:{
    "[style.display]": "'inline-block'",
    "[style.width.%]": "100",
    "[style.height.%]": "100",
  },
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  currentconversation: Conversation;
  subscription: any;
  message: String = "";
  constructor(private conversationService: ConversationService) {
    this.subscription = this.conversationService.conversationChanged$.subscribe(c => {
      console.log('conversation changed at NewMessageComponent!');
      this.currentconversation = c;
    })
   }

  ngOnInit() {
  }

  onSend() {
    console.log(this.message);
    this.message = "";
  }
}
