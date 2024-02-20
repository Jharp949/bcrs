/*
* Project Name: service-repair.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent {
  services = [
    { name: 'Password Reset', price: 39.99, checked: false },
    { name: 'Spyware Removal', price: 99.99, checked: false },
    { name: 'RAM Upgrade', price: 129.99, checked: false },
    { name: 'Software Installation', price: 49.99, checked: false },
    { name: 'PC Tune-up', price: 89.99, checked: false },
    { name: 'Keyboard Cleaning', price: 45.00, checked: false },
    { name: 'Disk Clean-up', price: 129.99, checked: false }
  ];

  customService = {
    parts: 0,
    hours: 0,
    total: 0
  };

  calculateCustomService() {
    // Calculate total based on checkboxes
    const selectedServices = this.services.filter(service => service.checked);
    const selectedServicesTotal = selectedServices.reduce((total, service) => total + service.price, 0);

    // Custom service charge: flat fee for parts ($100) + (number of hours * $50) + selected services total
    this.customService.total = this.customService.parts * 100 + this.customService.hours * 50 + selectedServicesTotal;
  }
}
