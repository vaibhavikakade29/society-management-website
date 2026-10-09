import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutMessageComponent } from './logout-message.component';

describe('LogoutMessageComponent', () => {
  let component: LogoutMessageComponent;
  let fixture: ComponentFixture<LogoutMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutMessageComponent]
    });
    fixture = TestBed.createComponent(LogoutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
