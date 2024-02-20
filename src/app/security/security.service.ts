/**
 * Title: security.service.ts
 * Author: James Harper
 * Date: 1/31/24
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  findUserById(empId: number) {
    return this.http.get('/api/users/find-one' + empId); // returns the employee object
  }

  signin(email: string, password: string) {
    return this.http.post('/api/security/signin', { email, password }); // returns the email and password
  }

  register(email: string, password: string, firstName: string, lastName: string, phoneNumber: number, address: string,) {
    return this.http.post('/api/security/register', { email, password, firstName, lastName, phoneNumber, address }); // returns the email and password
  }

  getUserRoles(): string[] {

    const roles = this.cookieService.get('session_role');
    return roles ? roles.split(',') : [];
  }
  getUser(): any {

    return this.cookieService.get('session_user');
  }
  signOut(): void {

    this.cookieService.delete('session_user');
    this.cookieService.delete('session_role');
    this.router.navigate(['/signin']);
  }
}