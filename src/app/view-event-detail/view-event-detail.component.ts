import { Component, OnInit } from '@angular/core';
import {Event, Rsvp, RsvpType} from '../event'
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {EventFacade} from "../event-facade";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.scss']
})
export class ViewEventDetailComponent implements OnInit {

  event$: Observable<Event>;
  private hash: string;
  personName: string;

  constructor(private eventFacade: EventFacade, private route: ActivatedRoute, private cookieService: CookieService) {
    this.event$ = eventFacade.initializeCurrentEvent();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hash = params['event_hash'];
      this.eventFacade.viewEvent(params['event_hash']);
    });
  }

  public rsvpYes() {
    this.eventFacade.recordRsvp({
      name: this.personName,
      eventHash: this.hash,
      userId: this.userId(),
      rsvp: RsvpType.YES
    });
  }

  public rsvpNo() {
    this.eventFacade.recordRsvp({
      name: this.personName,
      eventHash: this.hash,
      userId: this.userId(),
      rsvp: RsvpType.NO
    });
  }

  public hasRsvps(event) {
   return event.rsvps != null && event.rsvps.length != 0;
  }

  private userId() {
    let cookieValue = this.cookieService.get("rsvp-data");
    let rsvpData = cookieValue ? JSON.parse(cookieValue) : [];
    const userId = this.uuidv4();
    rsvpData.push({
      userId: userId
    });
    this.cookieService.set("rsvp-data", JSON.stringify(rsvpData));

    return userId;
  }

  rsvpCss(rsvp: Rsvp) {
    if (rsvp.rsvp == RsvpType.YES) {
      return "badge-success";
    } else if (rsvp.rsvp == RsvpType.NO) {
      return "badge-danger";
    } else {
      return "badge-primary";
    }
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }
    );
  }
}
