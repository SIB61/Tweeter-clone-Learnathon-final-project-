import { TestBed } from '@angular/core/testing';

import { BreakPointService } from './break-point.service';

describe('BreakPointService', () => {
  let service: BreakPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
