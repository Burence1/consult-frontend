import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneChatComponent } from './one-chat.component';

describe('OneChatComponent', () => {
  let component: OneChatComponent;
  let fixture: ComponentFixture<OneChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
