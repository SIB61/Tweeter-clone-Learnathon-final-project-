import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetSearchComponent } from './tweet-search.component';

describe('TweetSearchComponent', () => {
  let component: TweetSearchComponent;
  let fixture: ComponentFixture<TweetSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TweetSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
