import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetViewComponent } from './tweet-view.component';

describe('TweetViewComponent', () => {
  let component: TweetViewComponent;
  let fixture: ComponentFixture<TweetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TweetViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
