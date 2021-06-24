import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHoldComponent } from './on-hold.component';

describe('OnHoldComponent', () => {
  let component: OnHoldComponent;
  let fixture: ComponentFixture<OnHoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnHoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
