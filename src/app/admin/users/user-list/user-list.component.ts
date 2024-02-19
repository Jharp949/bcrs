/*
* Project Name: user-list.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/16/2024
*/

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from '../../../shared/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('error:', err);
      }
    });
  }

  deleteUser(empId: number | undefined) {
    if (empId !== undefined && empId !== null) {
      if (!confirm('Are you sure you want to delete this user?')) {
        return;
      }

      console.log('Deleting user:', empId);

      this.userService.deleteUser(empId.toString()).subscribe({
        next: (result) => {
          console.log('result:', result);
          this.users = this.users.filter((user) => user.empId !== empId);
        },
        error: (err) => {
          console.error('error:', err);
        }
      });
    } else {
      console.error('User ID is undefined or null');
    }
  }
}