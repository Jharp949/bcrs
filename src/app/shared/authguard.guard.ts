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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.cookieService.get('session_user')) {
      return true; // Allow the route to load
    } else {
      this.router.navigate(['/signin']); // Redirect to login page
      return false; // Prevent the route from loading
    }
  }
}