import { TestBed } from '@angular/core/testing';

import { RetryRequestInterceptorService } from './retry-request-interceptor.service';

describe('RetryRequestInterceptorService', () => {
  let service: RetryRequestInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetryRequestInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
