import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../shared/invoice.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoiceSubject: BehaviorSubject<Invoice | null> = new BehaviorSubject<Invoice | null>(null);
  public selectedInvoice$: Observable<Invoice | null> = this.invoiceSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateInvoice(invoice: Invoice | null): void {
    this.invoiceSubject.next(invoice);
  }

  /**
  * @description - This function is used to get the line items from the MongoDB collection
  * @returns - response from the API
  */
   getLineItems(): Observable<any> {
    return this.http.get('/api/invoice/purchases-graph');
  }
}