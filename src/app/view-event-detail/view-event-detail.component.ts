import { Component, OnInit } from '@angular/core';
import {Event} from '../event'
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Store, select, createSelector} from '@ngrx/store';
import {eventView} from "../event.actions";
import {AppState} from "../event.reducer";

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.scss']
})
export class ViewEventDetailComponent implements OnInit {

  event$: Observable<Event>;

  constructor(private store: Store<{currentEvent: Event}>, private route: ActivatedRoute) {
    const selectCurrentEvent = (state: AppState) => {
      return state.currentEvent
    };
    const selector = createSelector(selectCurrentEvent, (selectCurrentEvent: Event) => {
      return selectCurrentEvent
    });
    this.event$ = this.store.pipe(select('appState'), select(selector));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(eventView({hash: params['event_hash']}));
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
