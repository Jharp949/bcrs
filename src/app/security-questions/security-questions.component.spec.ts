import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionsComponent } from './security-questions.component';

describe('SecurityQuestionsComponent', () => {
  let component: SecurityQuestionsComponent;
  let fixture: ComponentFixture<SecurityQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityQuestionsComponent]
    });
    fixture = TestBed.createComponent(SecurityQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
