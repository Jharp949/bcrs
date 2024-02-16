




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './admin/users/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

   // Get all users
   findAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

   // Find user by ID
   findUserById(empId: string): Observable<any> {

    return this.http.get(`/api/users/${empId}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/users', {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
      password: user.password,
      selectedSecurityQuestions: user.selectedSecurityQuestions,
      role: user.role,
      isDisabled: user.isDisabled
    });
  }

  // Update user
updateUser(empId: string, user: User): Observable<any> {
  return this.http.put(`/api/users/${empId}`, {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    address: user.address,
    email: user.email,
    selectedSecurityQuestions: user.selectedSecurityQuestions,
    role: user.role,
    isDisabled: user.isDisabled
  });
}

 // Delete user
 deleteUser(empId: string): Observable<any> {
  return this.http.delete(`/api/users/${empId}`, { observe: 'response' });
}
}