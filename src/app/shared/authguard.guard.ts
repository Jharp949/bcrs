/*
* Project Name: authguard.guard.ts
* Author: Professor Krasso
* Contributors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

// Import statements
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService); // Inject the cookie service from the ngx-cookie-service package

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
  }
};
