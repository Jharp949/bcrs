/*
* Project Name: nav.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/security/security.service'; // Import SecurityService
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html', // Make sure this path is correct
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAdmin: boolean = false;
  isStandardUser: boolean = false;
  isLoggedIn: boolean = false; // Add this property

  constructor(
    private securityService: SecurityService, // Inject SecurityService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.isLoggedIn = !!this.securityService.getUser(); // Set isLoggedIn based on whether the user is logged in
  }

  private checkUserRole() {
    let userRoles = this.securityService.getUserRoles(); // Use securityService to get user roles

    // If userRoles is a string, convert it to an array
    if (typeof userRoles === 'string') {
      userRoles = [userRoles];
    }

    this.isAdmin = userRoles.includes('admin');
    this.isStandardUser = userRoles.includes('standard');
  }

  signOut(): void {
    this.securityService.signOut(); // Use securityService to sign out
    this.router.navigate(['/signin']);
  }
}