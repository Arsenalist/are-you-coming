import { TestBed } from '@angular/core/testing';

import { UserIdServiceService } from './user-id-service.service';

describe('UserIdServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserIdServiceService = TestBed.get(UserIdServiceService);
    expect(service).toBeTruthy();
  });
});
