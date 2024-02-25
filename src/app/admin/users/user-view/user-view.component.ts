/*
* Project Name: user-view.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/16/2024
*/


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const empId = params.get('empId');
      if (empId) {
        this.userService.findUserById(empId).subscribe(
          (userData: User) => {
            this.user = userData;
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
      }
    });
  }
}


