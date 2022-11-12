import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTweetComponent } from './update-tweet.component';

describe('UpdateTweetComponent', () => {
  let component: UpdateTweetComponent;
  let fixture: ComponentFixture<UpdateTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateTweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
