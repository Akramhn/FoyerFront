import { TestBed } from '@angular/core/testing';

import { EtudiantGuardGuard } from './etudiant-guard.guard';

describe('EtudiantGuardGuard', () => {
  let guard: EtudiantGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EtudiantGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
