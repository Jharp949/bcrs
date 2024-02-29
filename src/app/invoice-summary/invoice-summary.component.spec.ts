/*
* Project Name: invoice-summary.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/26/2024
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryComponent } from './invoice-summary.component';

describe('InvoiceSummaryComponent', () => {
  let component: InvoiceSummaryComponent;
  let fixture: ComponentFixture<InvoiceSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceSummaryComponent]
    });
    fixture = TestBed.createComponent(InvoiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
