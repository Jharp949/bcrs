/*
* Project Name: services.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/27/2024
*/


import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/security/security.service';
import { User } from '../../../shared/user.interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // import CookieService

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  updateMessage: string = '';

  constructor(
    private securityService: SecurityService,
    private userService: UserService,
    private route: ActivatedRoute,
    private cookieService: CookieService // inject CookieService
  ) {
    this.user = {} as User;
  }

  ngOnInit(): void {


    let empId: number;
    this.route.params.subscribe(params => {
      const empId = Number(params['empId']);

      if (!empId) {
        console.error('Invalid empId:', empId);
        return;
      }

      this.securityService.findOne(empId).subscribe({
        next: (user: any) => {
          this.user = user as User;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        }
      });
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.user.empId, this.user).subscribe(
      (response) => {
        console.log(response); // Log the response
        this.updateMessage = 'User updated successfully';

        // Clear the updateMessage after 3 seconds
      setTimeout(() => {
        this.updateMessage = '';
      }, 3000);
      },
      (err) => {
        console.error('Error updating user:', err);
        this.updateMessage = 'Error updating user'; // Set an error message

      // Clear the updateMessage after 3 seconds
      setTimeout(() => {
        this.updateMessage = '';
      }, 3000);
      }
    );
  }


}