import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreviewCartComponent } from './user-preview-cart.component';

describe('UserPreviewCartComponent', () => {
  let component: UserPreviewCartComponent;
  let fixture: ComponentFixture<UserPreviewCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserPreviewCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPreviewCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
