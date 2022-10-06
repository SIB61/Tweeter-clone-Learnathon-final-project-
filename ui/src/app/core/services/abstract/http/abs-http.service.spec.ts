import { TestBed } from '@angular/core/testing';

import { AbsHttpService } from './abs-http.service';

describe('AbsHttpService', () => {
  let service: AbsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
