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
      permalink: 'http://somethingunique.example.com',
      hash: 'party123'
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

  it('should return an event when a valid hash is provided', () => {
    const service: EventsService = TestBed.get(EventsService);

    const event: Event = {
      id: 2,
      name: 'Royal Rumble',
      hash: 'abc123',
      permalink: 'http://example.com/abc123'
    };

    service.getEventByHash(event.hash).subscribe((data: Event) => {
      expect(data.id).toBe(event.id);
      expect(data.name).toBe(event.name);
      expect(data.hash).toBe(event.hash);
      expect(data.permalink).toBe(event.permalink);
    });

    const req = httpMock.expectOne(environment.baseEndpointUrl + '/events/' + event.hash);
    expect(req.request.method).toBe('GET');
    req.flush(event);
  });


  it('should return an empty body when an invalid hash is provided', () => {
    const service: EventsService = TestBed.get(EventsService);

    const returnValue = {};
    const invalidHash = 'invalid-hash';

    service.getEventByHash(invalidHash).subscribe((data: any) => {
      expect(data).toBe(returnValue);
    });

    const req = httpMock.expectOne(environment.baseEndpointUrl + '/events/' + invalidHash);
    expect(req.request.method).toBe('GET');
    req.flush(returnValue);
  });


  afterEach(() => {
    httpMock.verify();
  });
});
