import { TestBed } from '@angular/core/testing';

import { ExerciceServiceService } from './exercice-service.service';

describe('ExerciceServiceService', () => {
  let service: ExerciceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
