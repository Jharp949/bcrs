/*
* Project Name: app.module.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string | null = null;

  constructor(private http: HttpClient) { }

   // Get all users
   findAllUsers(): Observable<any> {
    return this.http.get('/api/users/find-all');
  }

   // Find user by ID
   findUserById(empId: string): Observable<any> {

    return this.http.get(`/api/users/find-one/${empId}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/users/create', {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      selectedSecurityQuestions: user.selectedSecurityQuestions,
      role: 'standard',
      isDisabled: false
    });
  }

  // Update user
updateUser(empId: string, user: User): Observable<any> {
  return this.http.put(`/api/users/update/${empId}`, {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      selectedSecurityQuestions: user.selectedSecurityQuestions,
      role: 'standard',
      isDisabled: false
  });
}


 // Delete user
 deleteUser(empId: string): Observable<any> {
  return this.http.delete(`/api/users/delete/${empId}`, { observe: 'response' });
}


}