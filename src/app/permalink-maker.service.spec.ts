import { TestBed } from '@angular/core/testing';

import { PermalinkMakerService } from './permalink-maker.service';

describe('PermalinkMakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermalinkMakerService = TestBed.get(PermalinkMakerService);
    expect(service).toBeTruthy();
  });
});
