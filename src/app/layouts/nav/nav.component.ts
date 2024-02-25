/*
* Project Name: nav.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from 'src/app/security/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean = false;
  isStandardUser: boolean = false;
  empId: number | null = null;

  constructor(
    private cookieService: CookieService,
    private securityService: SecurityService,
    private router: Router
  ) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;

    if (this.isLoggedIn) {
      // Set empId if available
      const empId = this.cookieService.get('session_empId');
      this.empId = empId ? +empId : null;

      this.checkUserRole();
    }
  }

  ngOnInit(): void {}

  private checkUserRole() {
    let userRoles = this.cookieService.get('session_role').split(',');

    if (typeof userRoles === 'string') {
      userRoles = [userRoles];
    }

    this.isAdmin = userRoles.includes('admin');
    this.isStandardUser = userRoles.includes('standard');
  }

  signOut() {
    console.log('Signing out...');
    this.cookieService.deleteAll();
    this.router.navigate(['/signin']);
  }
}
