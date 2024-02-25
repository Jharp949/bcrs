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
import { SelectedSecurityQuestion } from '../shared/user.interface';

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
   findUserById(empId: number): Observable<any> {

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
updateUser(empId: number, user: User): Observable<any> {
  return this.http.put(`/api/users/update/${empId}`, {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      selectedSecurityQuestions: user.selectedSecurityQuestions,
  });
}


 // Delete user
 deleteUser(empId: number): Observable<any> {
  return this.http.delete(`/api/users/delete/${empId}`, { observe: 'response' });
}

/**
   * @description - This function is used to register a new user
   * @param user - user object
   * @returns - response from the API
   */
registerUser(user: User) {
  return this.http.post('/api/security/register', user);
}

/**
 * @description - This function is used to verify the user's email
 * @param email - user email
 * @returns - response from the API
 */
verifyEmail(email: string) {
  return this.http.get(`/api/security/verify-email/${email}`);
}

/**
 * @description - This function is used to verify the user's security questions
 * @param email - user email
 * @param securityQuestions - array of selected security questions
 * @returns - response from the API
 */
verifySecurityQuestions(email: string, securityQuestions: SelectedSecurityQuestion[]) {
  return this.http.post(`/api/security/verify/users/security-questions/${email}`, { securityQuestions });
}

/**
 * @description - This function is used to reset the user's password
 * @param email - user email
 * @param password - user password
 * @returns - response from the API
 */
resetPassword(email: string, password: string) {
  return this.http.post(`/api/security/reset-password/${email}`, { password });
}

/**
 * @description - This function is used to get the user's security questions
 * @param email - user email
 * @returns - response from the API
 */
getSecurityQuestions(email: string) {
  return this.http.get(`/api/users/${email}/security-questions`);
}

}