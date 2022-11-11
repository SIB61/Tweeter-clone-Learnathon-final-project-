import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationViewComponent } from './notification-view.component';

describe('NotificationViewComponent', () => {
  let component: NotificationViewComponent;
  let fixture: ComponentFixture<NotificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NotificationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
