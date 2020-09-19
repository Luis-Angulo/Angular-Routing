import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  loading = true; // controls animations by activating on some events using the router event method
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

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    // irl don't use services from the template
    private messageService: MessageService
  ) {
    // subscribe to changes in route activation
    router.events.subscribe((routerEvent: Event) =>
      this.checkRouterEvent(routerEvent)
    );
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    // navigate will only replace the primary route segment
    // I.E.: a primary with a secondary route /welcome(popup:messages) would retain the secondary (popup:messages)
    this.router.navigateByUrl('/welcome');
  }
}
