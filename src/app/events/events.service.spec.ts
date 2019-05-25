import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';
import {Event} from '../event';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

describe('EventsService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService]
    });
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });

  it('should return a valid response when creating an event', () => {
    const service: EventsService = TestBed.get(EventsService);

    const newEvent: Event = {
      id: 1,
      name: 'Party at my house',
      permalink: 'http://somethingunique.example.com'
    };

    service.createEvent('Party at my house').subscribe((data: Event) => {
      expect(data.id).toBe(1);
      expect(data.name).toBe('Party at my house');
      expect(data.permalink).toBe('http://somethingunique.example.com');
    });

    const req = httpMock.expectOne(environment.baseEndpointUrl + '/events');
    expect(req.request.method).toBe('POST');
    req.flush(newEvent);
});
  afterEach(() => {
    httpMock.verify();
  });
});
