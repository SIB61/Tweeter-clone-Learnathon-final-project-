import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLayoutComponent } from './search-layout.component';

describe('SearchLayoutComponent', () => {
  let component: SearchLayoutComponent;
  let fixture: ComponentFixture<SearchLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SearchLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
