/*
* Project Name: invoice-summary.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/26/2024
*/
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Invoice } from "../../app/shared/invoice.interface";

@Component({
  selector: 'invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent implements OnInit {
  //calls over the invoice
  invoice: Invoice

  constructor(private dialogRef: MatDialogRef<InvoiceSummaryComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.invoice = data.invoice;
  }

  ngOnInit(): void {
  }

}