import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomlistsComponent } from './roomlists.component';

describe('RoomlistsComponent', () => {
  let component: RoomlistsComponent;
  let fixture: ComponentFixture<RoomlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomlistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
