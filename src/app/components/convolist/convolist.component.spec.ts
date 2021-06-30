import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvolistComponent } from './convolist.component';

describe('ConvolistComponent', () => {
  let component: ConvolistComponent;
  let fixture: ComponentFixture<ConvolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
