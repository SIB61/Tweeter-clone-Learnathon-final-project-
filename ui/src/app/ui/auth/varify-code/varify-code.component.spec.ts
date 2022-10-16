import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarifyCodeComponent } from './varify-code.component';

describe('VarifyCodeComponent', () => {
  let component: VarifyCodeComponent;
  let fixture: ComponentFixture<VarifyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VarifyCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarifyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
