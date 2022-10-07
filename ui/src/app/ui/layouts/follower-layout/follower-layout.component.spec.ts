import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerLayoutComponent } from './follower-layout.component';

describe('FollowerLayoutComponent', () => {
  let component: FollowerLayoutComponent;
  let fixture: ComponentFixture<FollowerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FollowerLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
