import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService, private router: Router) { }

  logOut(): void {
    this.authService.logout();
    // navigate will only replace the primary route segment
    // I.E.: a primary with a secondary route /welcome(popup:messages) would retain the secondary (popup:messages)
    this.router.navigate(['/welcome']);
  }
}
