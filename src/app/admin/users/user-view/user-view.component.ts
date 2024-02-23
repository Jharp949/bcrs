/*
* Project Name: user-view.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/16/2024
*/

import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from '../../../shared/user.interface';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService.findAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('error:', err);
      },
      complete: () => {
        console.log('users:', this.users)
      }
    });
  }

  deleteUser(empId: number | undefined) {
    if (empId !== undefined) {
      if (!confirm('Are you sure you want to delete this user?')) {
        return;
      }

      console.log('Deleting user:', empId);

      this.userService.deleteUser(empId).subscribe({
        next: (result) => {
          console.log('result:', result);
          this.users = this.users.filter((user) => user.empId !== Number(empId));
             },
        error: (err) => {
          console.error('error:', err);
        }
      });
    } else {
      console.error('User ID is undefined');
    }
  }
}