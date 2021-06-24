import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTasksComponent } from './patient-tasks.component';

describe('PatientTasksComponent', () => {
  let component: PatientTasksComponent;
  let fixture: ComponentFixture<PatientTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
