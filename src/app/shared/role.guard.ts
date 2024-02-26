/*
* Project Name: role.guard.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data ? route.data['expectedRole'] : undefined;

    // Check if the user is logged in
    if (this.cookieService.get('session_user')) {
      // Check if the user has the expected role
      if (expectedRoles) {
        const userRoles = this.cookieService.get('session_role').split(','); // Split into an array

        if (Array.isArray(expectedRoles)) {
          // Check if the user's role matches any of the expected roles
          if (expectedRoles.some(role => userRoles.includes(role))) {
            return true; // Allow access
          }
        } else if (userRoles.includes(expectedRoles)) {
          return true; // Allow access
        }
      } else {
        // No specific role expected, allow access
        return true;
      }
    }

    // Redirect to the home page if the user doesn't have the expected role or is not logged in
    this.router.navigate(['/']);
    return false; // Prevent access
  }
}