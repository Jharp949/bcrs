/*
* Project Name: service-graph.component.spec.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceGraphComponent } from './service-graph.component';

describe('ServiceGraphComponent', () => {
  let component: ServiceGraphComponent;
  let fixture: ComponentFixture<ServiceGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceGraphComponent]
    });
    fixture = TestBed.createComponent(ServiceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
