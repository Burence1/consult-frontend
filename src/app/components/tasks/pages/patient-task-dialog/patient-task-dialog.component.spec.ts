import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTaskDialogComponent } from './patient-task-dialog.component';

describe('PatientTaskDialogComponent', () => {
  let component: PatientTaskDialogComponent;
  let fixture: ComponentFixture<PatientTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
