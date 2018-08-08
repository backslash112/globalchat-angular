import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { ConversationService } from '../../services/conversation.service';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Message } from '../../models/message.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-message',
  // host: {
  //   "[style.display]": "'inline-block'",
  //   "[style.width.%]": "100",
  //   "[style.height.%]": "100",
  // },
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  conversation: Conversation;
  subscription: any;
  // message: string = "";
  form: FormGroup;
  constructor(
    private conversationService: ConversationService,
    private authService: AuthService,
    private fb: FormBuilder) {
    this.subscription = this.conversationService.conversationChanged$.subscribe(c => {
      if (!c) return;
      this.conversation = c;
      if (c.draft) {
        this.form.setValue({ message: c.draft });
      }
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      message: ["", [Validators.required]]
    })
    this.form.valueChanges.subscribe(v => console.log(this.form));

  }

  onSubmit() {
    const messageText = this.form.controls["message"].value;
    const message = new Message(messageText, this.authService.getCurrentUser(), this.conversation.user);
    this.conversationService.say(message);
    // messageText = "";
    this.form.setValue({ message: "" });
    this.conversationService.saveConversationDraft("");
  }

  valueChanged() {
    this.conversationService.saveConversationDraft(this.form.controls["message"].value);
  }
}
