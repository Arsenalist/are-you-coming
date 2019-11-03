import { TestBed } from '@angular/core/testing';

import { EventFacadeService } from './event-facade';

describe('EventFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventFacadeService = TestBed.get(EventFacadeService);
    expect(service).toBeTruthy();
  });
});
