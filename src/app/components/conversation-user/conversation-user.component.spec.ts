import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationUserComponent } from './conversation-user.component';

describe('ConversationUserComponent', () => {
  let component: ConversationUserComponent;
  let fixture: ComponentFixture<ConversationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
