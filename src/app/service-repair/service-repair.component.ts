/*
* Project Name: service-repair.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceSummaryComponent } from '../invoice-summary/invoice-summary.component';
import { InvoiceService } from '../shared/invoice.service';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent {
constructor(private http: HttpClient, private dialog: MatDialog, private invoiceService: InvoiceService) { } // Inject the HttpClient service

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

  submitInvoice() {
    // Calculate total based on checkboxes and custom service details
    const selectedServices = this.services.filter(service => service.checked);
    const selectedServicesTotal = selectedServices.reduce((total, service) => total + service.price, 0);
    const customServiceTotal = this.customService.parts * 100 + this.customService.hours * 50;
    const total = selectedServicesTotal + customServiceTotal;

    // Prepare data for the invoice
    const invoiceData = {
      invoiceNumber: 'INV' + Date.now(),
      amount: total,
      dueDate: new Date().toISOString(),
      customerId: 'CUSTOMER_ID', // Replace with actual customer ID
      items: selectedServices.map(service => ({ name: service.name, quantity: 1, price: service.price }))
    };

    this.http.post('/api/invoice/createInvoice', invoiceData, { responseType: 'text' }).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
        console.log('Invoice generated successfully:', response);
        this.invoiceService.updateInvoice(response.invoice); // Use updateInvoice instead of changeInvoice
        this.dialog.open(InvoiceSummaryComponent, { data: { invoice: response.invoice } });
      },
      (error: any) => {
        console.error('Error generating invoice:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
      }
    );
  }
}

