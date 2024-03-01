import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../shared/invoice.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoiceSubject: BehaviorSubject<Invoice | null> = new BehaviorSubject<Invoice | null>(null);
  public selectedInvoice$: Observable<Invoice | null> = this.invoiceSubject.asObservable();

  constructor() {}

  updateInvoice(invoice: Invoice | null): void {
    this.invoiceSubject.next(invoice);
  }
}