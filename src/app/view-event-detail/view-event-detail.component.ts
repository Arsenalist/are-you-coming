import {Component, OnInit} from '@angular/core';
import {Event, Rsvp, RsvpType} from '../event'
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {EventFacade} from "../event-facade";
import {map} from "rxjs/operators";
import {UserIdServiceService} from "../user-id-service.service";

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.scss']
})
export class ViewEventDetailComponent implements OnInit {

  event$: Observable<Event>;
  private hash: string;
  personName: string;
  displayErrorMessage = false;

  constructor(private eventFacade: EventFacade, private route: ActivatedRoute, private userIdSerivce: UserIdServiceService) {
    this.event$ = eventFacade.initializeCurrentEvent();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hash = params['event_hash'];
      this.eventFacade.viewEvent(params['event_hash']);
    });
  }

  numYes(): Observable<number> {
    return this.event$.pipe(
      map(e => e.rsvps.filter(r => r.rsvp == "yes").length),
    );
  }

  numNo(): Observable<number> {
    return this.event$.pipe(
      map(e => e.rsvps.filter(r => r.rsvp == "no").length),
    );
  }

  public rsvpYes() {
    this.setDisplayErrorMessage();
    if (this.displayErrorMessage) {
      return;
    }
    this.eventFacade.recordRsvp({
      name: this.personName,
      eventHash: this.hash,
      userId: this.userIdSerivce.userId(),
      rsvp: RsvpType.YES
    });
  }

  public rsvpNo() {
    this.setDisplayErrorMessage();
    if (this.displayErrorMessage) {
      return;
    }
    this.eventFacade.recordRsvp({
      name: this.personName,
      eventHash: this.hash,
      userId: this.userIdSerivce.userId(),
      rsvp: RsvpType.NO
    });
  }

  public hasRsvps(event) {
   return event.rsvps != null && event.rsvps.length != 0;
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

  showDeleteOption(rsvp: Rsvp) {
    return rsvp.userId == this.userIdSerivce.userId();
  }

  public deleteRsvp(rsvp: Rsvp, e: any) {
    this.eventFacade.deleteRsvp({
      name: rsvp.name,
      eventHash: rsvp.eventHash,
      userId: this.userIdSerivce.userId()
    });
    e.preventDefault();
    return false;
  }

  setDisplayErrorMessage() {
    this.displayErrorMessage = this.personName === undefined || this.personName.trim() == "";
  }

}
