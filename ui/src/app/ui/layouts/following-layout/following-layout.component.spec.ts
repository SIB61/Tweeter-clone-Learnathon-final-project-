import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingLayoutComponent } from './following-layout.component';

describe('FollowingLayoutComponent', () => {
  let component: FollowingLayoutComponent;
  let fixture: ComponentFixture<FollowingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FollowingLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
