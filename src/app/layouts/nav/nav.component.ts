/*
* Project Name: nav.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

// imports statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface AppUser {
  firstName: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  appUser: AppUser;
  isSignedIn: boolean;

  constructor(private cookieService: CookieService) {
    this.appUser = {} as AppUser;
    this.isSignedIn = this.cookieService.get('session_user') ? true : false;

    if (this.isSignedIn) {
      this.appUser = {
        firstName: this.cookieService.get('session_name')
      }
      console.log(this.appUser.firstName);
  }
  
  }

  signout() {
    console.log("Signing out...");
    this.cookieService.deleteAll();
    window.location.href = '/';
  }
}
