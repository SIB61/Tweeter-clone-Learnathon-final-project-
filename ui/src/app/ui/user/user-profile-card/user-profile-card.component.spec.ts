import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCardComponent } from './user-profile-card.component';

describe('UserProfileCardComponent', () => {
  let component: UserProfileCardComponent;
  let fixture: ComponentFixture<UserProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserProfileCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
