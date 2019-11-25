import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable } from 'rxjs';
import {Event, Rsvp} from '../event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient ) { }

  createEvent(eventName: string): Observable<Event> {
    return this.http.put<Event>(environment.baseEndpointUrl + '/event', {name: eventName});
  }

  getEventByHash(hash: string): Observable<Event> {
    return this.http.get<Event>(environment.baseEndpointUrl + `/event/${hash}`);
  }

  rsvp(hash: string, rsvp: Rsvp) {
    return this.http.post(environment.baseEndpointUrl + `/event/rsvp`, rsvp);
  }
}
