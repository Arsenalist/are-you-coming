import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Event} from '../event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient ) { }

  createEvent(eventName: string): Observable<Event> {
    return this.http.post<Event>(environment.baseEndpointUrl + '/events', {name: eventName});
  }
}
