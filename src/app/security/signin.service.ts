import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './signin.interface'; // replace with the actual path to your User interface file

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(private http: HttpClient) { }

  signin(user: User): Observable<any> {
    return this.http.post<any>('/api/security/signin', user);
  }
}