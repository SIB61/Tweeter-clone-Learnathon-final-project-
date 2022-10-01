import { TestBed } from '@angular/core/testing';

import { ErrorHandlingInterceptorService } from './error-handling-interceptor.service';

describe('ErrorHandlingInterceptorService', () => {
  let service: ErrorHandlingInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlingInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
