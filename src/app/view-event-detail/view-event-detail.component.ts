import { Component, OnInit } from '@angular/core';
import {Event} from '../event'
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {EventFacade} from "../event-facade";

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.scss']
})
export class ViewEventDetailComponent implements OnInit {

  event$: Observable<Event>;

  constructor(private eventFacade: EventFacade, private route: ActivatedRoute) {
    this.event$ = eventFacade.initializeCurrentEvent();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventFacade.viewEvent(params['event_hash']);
    });
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
