/*
* Project Name: authguard.guard.ts
* Author: Professor Krasso
* Contributors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

<<<<<<< HEAD
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.cookieService.get('session_user')) {
      return true; // Allow the route to load
    } else {
      this.router.navigate(['/signin']); // Redirect to login page
      return false; // Prevent the route from loading
    }
=======
  /**
   * if the user is logged in, allow the route to load
   */
  if (cookie.get('session_user')) {
    console.log('User is signed in and can access the Dashboard page');
    return true;
  } else {
    console.log('User is not signed in and cannot access the Dashboard page');
    const router = inject(Router); // injects the router
    router.navigate(['/signin'], { queryParams:  {returnUrl: state.url }}); // navigates the user to the signin page
    return false;
>>>>>>> f68afc29fe58eda933942aeb540b598f62f12e21
  }
}