import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  rsvp(hash: string, rsvp: Rsvp): Observable<Event> {
    return this.http.post<Event>(environment.baseEndpointUrl + `/event/rsvp`, rsvp);
  }

  deleteRsvp(partialRsvp: Partial<Rsvp>): Observable<Event> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: partialRsvp
    };
    return this.http.delete<Event>(environment.baseEndpointUrl + `/event/rsvp`, options);
  }
}
