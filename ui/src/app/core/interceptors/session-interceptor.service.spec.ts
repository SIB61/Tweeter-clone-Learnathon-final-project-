import { TestBed } from '@angular/core/testing';

import { SessionInterceptorService } from './session-interceptor.service';

describe('SessionInterceptorService', () => {
  let service: SessionInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
