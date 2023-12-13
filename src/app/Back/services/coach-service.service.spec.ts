import { TestBed } from '@angular/core/testing';

import { CoachServiceService } from './coach-service.service';

describe('CoachServiceService', () => {
  let service: CoachServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
