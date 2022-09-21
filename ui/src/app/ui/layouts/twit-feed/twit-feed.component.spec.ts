import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitFeedComponent } from './twit-feed.component';

describe('TwitFeedComponent', () => {
  let component: TwitFeedComponent;
  let fixture: ComponentFixture<TwitFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TwitFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
