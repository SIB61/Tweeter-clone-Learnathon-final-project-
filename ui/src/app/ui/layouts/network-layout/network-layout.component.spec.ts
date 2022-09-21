import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLayoutComponent } from './network-layout.component';

describe('NetworkLayoutComponent', () => {
  let component: NetworkLayoutComponent;
  let fixture: ComponentFixture<NetworkLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NetworkLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
