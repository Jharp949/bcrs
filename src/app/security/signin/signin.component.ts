/*
* Project Name: signin.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/16/2024
*/

// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SigninService } from '../signin.service';
import { SecurityService } from '../../security/security.service';

// Component metadata
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  // Declare form, error message, and loading state
  signinForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  // Inject necessary services in the constructor
  constructor(
    private formBuilder: FormBuilder, // for building the form
    private SigninService: SigninService, // for handling sign-in
    private router: Router, // for navigation
    private cookieService: CookieService, // for managing cookies
    private securityService: SecurityService // for managing security
  ) { }

  // Initialize the form when the component is created
  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // email field with required and email validators
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$')]] // password field with required and pattern validators
    });
  }

  // Handle form submission
  signin(): void {
    // If the form is invalid, show an error message and return
    if (this.signinForm.invalid) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }

    // Set loading state to true
    this.isLoading = true;

    // Call the signin method of the SigninService with the form value
    this.SigninService.signin(this.signinForm.value).subscribe(
      // If the request is successful, set cookies and navigate to the home page
      data => {

        console.log('empId:', data.empId);
        this.cookieService.set('session_empId', data.empId, 1);
        console.log('session_empId cookie:', this.cookieService.get('session_empId'));
        this.cookieService.set('session_user', data.email, 1);
        this.cookieService.set('session_name', `${data.firstName} ${data.lastName}`, 1);
        this.cookieService.set('session_role', data.role, 1);
        console.log('empId:', data.empId);


        this.securityService.userSignedIn.next();
        this.router.navigate(['/service-repair']);

        console.log('User has logged in');
      },
      // If the request fails, show an error message and set loading state to false
      error => {
        console.log('Error logging in:', error)
        this.errorMessage = 'Invalid email or password.';
        this.isLoading = false;
      }
    );
  }
}