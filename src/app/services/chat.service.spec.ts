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
    const user = new User("user2@gmail.com");
    const message = new Message("hi, there");
    message.from = authService.getCurrentUser();
    service.send(message, user);
  }));
});
