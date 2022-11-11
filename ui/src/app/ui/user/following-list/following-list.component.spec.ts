import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingListComponent } from './following-list.component';

describe('FollowingListComponent', () => {
  let component: FollowingListComponent;
  let fixture: ComponentFixture<FollowingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FollowingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
