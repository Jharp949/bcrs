/*
* Project Name: services.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/27/2024
*/


import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/security/security.service';
import { User } from './../../shared/user.interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // import CookieService

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  updateMessage: string = '';

  constructor(
    private securityService: SecurityService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService // inject CookieService
  ) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    console.log('session_empId cookie:', this.cookieService.get('session_empId'));
    const empId = Number(this.cookieService.get('session_empId')); // get empId from cookie

    if (!empId) {
      console.error('Invalid session_empId:', this.cookieService.get('session_empId'));
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
  }

  updateUser(): void {
    this.userService.updateUser(this.user.empId, this.user).subscribe(
      (response) => {
        console.log(response); // Log the response
        this.updateMessage = 'User updated successfully';
        this.getUser();
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

  getUser(): void {
    const empId = Number(this.cookieService.get('session_empId'));

    if (!empId) {
      console.error('Invalid session_empId:', this.cookieService.get('session_empId'));
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
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { SecurityService } from 'src/app/security/security.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from './../../shared/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    address: '',
    selectedSecurityQuestions: [
      { question: '', answer: '' },
      { question: '', answer: '' },
      { question: '', answer: '' }
    ],
    role: '',
    isDisabled: false,
    empId: 0
  };

  constructor(private userService: UserService, private securityService: SecurityService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.securityService.getUser().subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        console.error('Invalid session_empId:', this.cookieService.get('session_empId'));
        return;
      }

      const sessionEmpId = this.cookieService.get('session_empId'); // Retrieve empId from session cookie

      if (!sessionEmpId) {
        console.error('Invalid session_empId: Session empId is undefined or null');
        return;
      }

      this.userService.findUserById(+sessionEmpId).subscribe({
        next: (user) => {
          console.log('Fetched user:', user);
          this.user = user;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        }
      });
    });
  }

  updateUser(): void {
    const updateUser = {
      address: this.user.address,
      phoneNumber: this.user.phoneNumber,
    };

    this.userService.updateUser(this.user.empId, updateUser).subscribe({
      next: () => {
        console.log('User updated successfully');

      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }
  }
*/