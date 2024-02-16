
/*
* Project Name: signin.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/16/2024
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SigninService } from './../signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private SigninService: SigninService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]]
    });
  }

  signin(): void {
    if (this.signinForm.invalid) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }

    this.isLoading = true;
    this.SigninService.signin(this.signinForm.value).subscribe(
      data => {
        this.cookieService.set('session_user', data.email, 1);
        this.cookieService.set('session_name', `${data.firstName} ${data.lastName}`, 1);
        this.cookieService.set('session_role', data.role, 1);
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = 'Invalid email or password.';
        this.isLoading = false;
      }
    );
  }
}