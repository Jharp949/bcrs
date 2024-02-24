/*
* Project Name: role.guard.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data ? route.data['expectedRole'] : undefined;

    if (expectedRole && this.cookieService.get('session_role') === expectedRole) {
      return true; // Allow access
    } else {
      this.router.navigate(['/']); // Redirect to the home page if the user doesn't have the expected role
      return false; // Prevent access
    }
  }
}