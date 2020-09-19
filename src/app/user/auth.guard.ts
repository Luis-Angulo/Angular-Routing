import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// a guard is just a service that implements an interface from the route guard lifecycle
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkLoggedIn(route.path);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(redirectUrl: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    // set the route the user wanted to originally access so that you can
    // use the service to redirect to it after login
    this.authService.redirectUrl = redirectUrl;
    this.router.navigate(['/login']);
    return false;
  }
}
