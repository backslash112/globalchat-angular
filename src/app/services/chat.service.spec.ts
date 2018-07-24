import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';

describe('ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService]
    });
  });

  it('should be created', inject([ChatService, AuthService], (service: ChatService, authService: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should can send message to server', inject([ChatService, AuthService], (service: ChatService, authService: AuthService) => {
    const user1 = new User("user1@gmail.com");
    const user2 = new User("user2@gmail.com");
    const message = new Message("hi, there", user1, user2);
    message.from = authService.getCurrentUser();
    service.send(message);
  }));
});
