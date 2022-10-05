import { TestBed } from '@angular/core/testing';

import { AbsTweetService } from './abs-tweet.service';

describe('AbsTweetService', () => {
  let service: AbsTweetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsTweetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
