import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { UserService } from './user.service';

describe('ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService]
    });
  });

  it('should be created', inject([ChatService, UserService], (service: ChatService, userService: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should can send message to server', inject([ChatService, UserService], (service: ChatService, userService: UserService) => {
    const user = new User("user2@gmail.com");
    const message = new Message("hi, there");
    message.from = userService.getCurrentUser();
    service.send(message, user);
  }));
});
