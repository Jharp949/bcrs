import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './signin.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(private http: HttpClient, private router: Router) { }

  signin(user: User): Observable<any> {
    return this.http.post<any>('/api/security/signin', user);
  }


}