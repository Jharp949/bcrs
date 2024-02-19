/**
 * Title: security.service.ts
 * Author: James Harper
 * Date: 1/31/24
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  findUserById(empId: number) {
    return this.http.get('/api/users/find-one' + empId); // retunrns the employee object
  }

  signin(email: string, password: string) {
    return this.http.post('/api/security/signin', { email, password }); // returns the email and password
  }

  register(email: string, password: string, firstName: string, lastName: string, phoneNumber: number, address: string,) {
    return this.http.post('/api/security/register', { email, password, firstName, lastName, phoneNumber, address }); // returns the email and password
  }
}
