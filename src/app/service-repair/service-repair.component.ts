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

  username = '';

  services = [
    { name: 'Password Reset', price: 39.99, checked: false },
    { name: 'Spyware Removal', price: 99.99, checked: false },
    { name: 'RAM Upgrade', price: 129.99, checked: false },
    { name: 'Software Installation', price: 49.99, checked: false },
    { name: 'PC Tune-up', price: 89.99, checked: false },
    { name: 'Keyboard Cleaning', price: 45.00, checked: false },
    { name: 'Disk Clean-up', price: 129.99, checked: false },
    { name: 'Custom Service', price: 0, checked: false }
  ];

  customService = {
    parts: 0,
    hours: 0,
    total: 0
  };

  totalCost = {
    total: 0
  };

    /* Calculates the parts and labor for Custom Service,
    and updates the lineItem total */
  calculateCustomService() {
    // Calculate the total price for custom service
    const partsPrice = this.customService.parts > 0 ? this.customService.parts + 100 : 0;
    const laborPrice = this.customService.hours * 50;
    const customServiceTotal = partsPrice + laborPrice;

    // Update the services array with the custom service details
    const customServiceIndex = this.services.findIndex(service => service.name === 'Custom Service');
    if (customServiceTotal > 0 && customServiceIndex !== -1) {
      this.services[customServiceIndex].price = customServiceTotal;
      this.services[customServiceIndex].checked = true;

      this.updateTotalCost();
    }
  }

  updateTotalCost() {
    const selectedServices = this.services.filter(service => service.checked);
    this.totalCost.total = selectedServices.reduce((total, service) => total + service.price, 0);
  }

  submitInvoice() {
    // Calculate total based on checkboxes and custom service details
    const selectedServices = this.services.filter(service => service.checked);
    const selectedServicesTotal = selectedServices.reduce((total, service) => total + service.price, 0);
    const total = selectedServicesTotal;

    // Prepare data for the invoice
    const invoiceData = {
      username: this.username,
      lineItems: selectedServices.map(service => ({ name: service.name, quantity: 1, price: service.price })),
      partsAmount: this.customService.parts,
      laborAmount: this.customService.hours,
      lineItemTotal: selectedServicesTotal,
      total: total,
      orderDate: new Date().toISOString(),
      invoiceNumber: 'INV' + Date.now(),
      amount: total,
    };

    if (invoiceData.username === '') {
      alert('Please enter a username');
      return;
    };

    this.http.post('/api/invoice/createInvoice', invoiceData, { responseType: 'text' }).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
        const parsedResponse = JSON.parse(response); // Parse the response string into a JSON object
        console.log('Invoice generated successfully:', parsedResponse.invoice);
        this.invoiceService.updateInvoice(parsedResponse.invoice);
        this.dialog.open(InvoiceSummaryComponent, {
          data: { invoice: parsedResponse.invoice },
          width: '600px',
          height: '800px'
        });
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

