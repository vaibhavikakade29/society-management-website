import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLifeComponent } from './community-life.component';

describe('CommunityLifeComponent', () => {
  let component: CommunityLifeComponent;
  let fixture: ComponentFixture<CommunityLifeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityLifeComponent]
    });
    fixture = TestBed.createComponent(CommunityLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
