/*
* Project Name: authguard.guard.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService); // injects the cookie service

  if (cookie.get('session_user')) {
    console.log('User is logged in and can access the Utilities page');
    return true;
  } else {
    console.log('User is not logged in and cannot access the Utilities page');
    const router = inject(Router); // injects the router
    router.navigate(['/security/signin'], { queryParams:  {returnUrl: state.url }}); // navigates the user to the signin page
    return false;
  }
};
