import { TestBed } from '@angular/core/testing';

import { ConsecutiveGuard } from './consecutive.guard';

describe('ConsecutiveGuard', () => {
  let guard: ConsecutiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConsecutiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
