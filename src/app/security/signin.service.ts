import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './signin.interface'; // replace with the actual path to your User interface file
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(private http: HttpClient, private router: Router) { }

  signin(user: User): Observable<any> {
    return this.http.post<any>('/api/security/signin', user)
      .pipe(
        tap(() => {
          // Navigate to the desired page after successful sign-in
          this.router.navigate(['/dashboard']);
        })
      );
  }
}