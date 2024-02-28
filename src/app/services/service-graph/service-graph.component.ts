/*
* Project Name: service-graph.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.css']
})
export class ServiceGraphComponent {
  title = "Bob's Computer Repair Shop: Services Graph";
  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: [
        'Password Reset',
        'Spyware Removal',
        'RAM Upgrade',
        'Software Installation',
        'PC Tune-up',
        'Keyboard Cleaning',
        'Disk Clean-up'
      ],
      datasets: [{
          data: [300, 50, 100, 75, 225, 100, 265],
          backgroundColor: [
              "#F2B90C",
              "#E8EBEB",
              "#007551",
              "#F28907",
              "#001120",
              "#002A20",
              "#6F7274"
          ],
          hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ]
      }]
    };
    }

    ngOnInit(): void {
      // Initialize data and options here, or fetch them from a service
    }
}
