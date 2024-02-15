/*
* Project Name: authguard.guard.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService) //inject CookieService

  if(cookie.get('session_user')) {
    console.log('You are logged in and have a valid session cookie set!')
    return true
  } else {
    console.log('You must be logged in to access this page!')

    const router = inject(Router)
    router .navigate(['/security/signin'], { queryParams: { returnURL: state.url}})
    return false //return false
  }
};
