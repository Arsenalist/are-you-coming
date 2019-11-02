import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service';
import {Event} from '../event'
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import { Store, select } from '@ngrx/store';
import {eventView} from "../event.actions";

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.scss']
})
export class ViewEventDetailComponent implements OnInit {

  event$: Observable<Event>;

  constructor(private store: Store<{currentEvent: Event}>, private route: ActivatedRoute) {
    this.event$ = store.pipe(select('currentEvent'));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("in ngOnInit ", params['event_hash']);
      this.store.dispatch(eventView(params['event_hash']));
    });
  }

  getEvent(hash: string) {
  //  this.eventsService.getEventByHash(hash).subscribe(event => {
  //    this.event = event;
  //  })
  }

  public rsvpYes() {
   // this.eventsService.rsvp({rsvp: 'yes', hash: this.event.hash});
  }

  public rsvpNo() {
   // this.eventsService.rsvp({rsvp: 'no', hash: this.event.hash});
  }

  public hasRsvps() {
    return false;
   // return this.event.rsvps != null && this.event.rsvps.length != 0;
  }
}
