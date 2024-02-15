import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionListComponent } from './security-question-list.component';

describe('SecurityQuestionListComponent', () => {
  let component: SecurityQuestionListComponent;
  let fixture: ComponentFixture<SecurityQuestionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityQuestionListComponent]
    });
    fixture = TestBed.createComponent(SecurityQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});