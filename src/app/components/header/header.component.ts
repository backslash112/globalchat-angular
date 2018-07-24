import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  user: User;
  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.user = this.authService.getCurrentUser();
  }

  onLogout() {
    console.log('onLogout() called!')
    this.chatService.leave();
    this.authService.signOut();
    this.router.navigate(["signin"]);
  }
}
