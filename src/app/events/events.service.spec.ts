import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';
import {HttpClientModule} from '@angular/common/http';

describe('EventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [EventsService]

  }));

  it('should be created', () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });
  it('should return a valid response when creating an event', () => {
    const service: EventsService = TestBed.get(EventsService);
    service.createEvent('Party at my house').subscribe(data => {
      expect(data['id']).toBe(1);
      expect(data['id']).toBe('Party at my house');
    });
  });

});
