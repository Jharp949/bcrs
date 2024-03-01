/*
* Project Name: invoice-summary.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/26/2024
*/
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Invoice } from "../../app/shared/invoice.interface";
import { InvoiceService } from "../../app/shared/invoice.service";

@Component({
  selector: 'invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent implements OnInit {
  //calls over the invoice
  invoice: Invoice = {
    username: '',
    lineItems: [],
    partsAmount: 0,
    laborAmount: 0,
    lineItemTotal: 0,
    total: 0,
    orderDate: new Date()
  };

  constructor(private dialogRef: MatDialogRef<InvoiceSummaryComponent>,
  @Inject(MAT_DIALOG_DATA) data: any,
  private invoiceService: InvoiceService) {

      // If data.invoice is available, assign it to this.invoice
      if (data.invoice) {
        this.invoice = data.invoice;
      }
  }

  ngOnInit(): void {
    // Alternatively, you can subscribe to changes in the InvoiceService
    this.invoiceService.selectedInvoice$.subscribe((invoice) => {
      if (invoice) {
        this.invoice = invoice;
      }
    });
  }
printInvoice() {
    let printContents: string;
    const invoiceContainer = document.getElementById('invoice-container');
    if (invoiceContainer) {
      printContents = invoiceContainer.innerHTML;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Invoice</title>
              <style>
                body {
                  font-family:'Quicksand', sans-serif;
                }
                h2, h3, h4 {
                  color: #2b4a32;
                }
                .no-print {
                  display: none;
                }
              </style>
            </head>
            <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        printWindow.document.close();
      }
    }
  }
}