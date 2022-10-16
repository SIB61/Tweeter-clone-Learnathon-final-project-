import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentViewComponent } from './comment-view.component';

describe('CommentViewComponent', () => {
  let component: CommentViewComponent;
  let fixture: ComponentFixture<CommentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CommentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
