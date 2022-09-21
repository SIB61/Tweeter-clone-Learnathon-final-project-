import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTweetComponent } from './create-tweet.component';

describe('CreateTweetComponent', () => {
  let component: CreateTweetComponent;
  let fixture: ComponentFixture<CreateTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateTweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
