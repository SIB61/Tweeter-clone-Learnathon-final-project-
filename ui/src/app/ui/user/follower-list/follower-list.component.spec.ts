import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerListComponent } from './follower-list.component';

describe('FollowerListComponent', () => {
  let component: FollowerListComponent;
  let fixture: ComponentFixture<FollowerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FollowerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
