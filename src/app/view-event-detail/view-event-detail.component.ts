import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Event, Rsvp, RsvpType} from '../event'
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {EventFacade} from "../event-facade";
import {filter, map} from "rxjs/operators";
import {UserIdServiceService} from "../user-id-service.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.scss']
})
export class ViewEventDetailComponent implements OnInit, OnDestroy {

  event$: Observable<Event>;
  private hash: string;
  personName: string;
  displayErrorMessage = false;
  editing: boolean = false;
  private editEventNameInput: ElementRef;
  eventNameIsDirty: boolean = false;
  private titleSubscription: Subscription;

  @ViewChild('editEventNameInput', {static: false})  set content(content: ElementRef) {
    this.editEventNameInput = content;
    if (content) {
      this.editEventNameInput.nativeElement.focus();
    }
  }

  constructor(private titleService: Title, private eventFacade: EventFacade, private route: ActivatedRoute, private userIdSerivce: UserIdServiceService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hash = params['event_hash'];
      this.event$ = this.eventFacade.viewEvent(params['event_hash']);
      this.titleSubscription = this.event$.pipe(
        filter(e => e !== undefined)
      ).subscribe(e => this.titleService.setTitle(e.name));

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

  public showEditEventNameOption(event: Event) {
    // we're just returning true for everything; maye at some point we'll implement security
    return true;
  }

  setDisplayErrorMessage() {
    this.displayErrorMessage = this.personName === undefined || this.personName.trim() == "";
  }

  enableEditMode() {
    this.editing = true;
    return false;
  }

  saveEventName(event) {
    this.editing = false;
    if (this.eventNameIsDirty) {
      this.eventFacade.saveEvent({name: event.name, hash: event.hash});
      this.eventNameIsDirty = false;
    }
    return false;
  }

  markAsDirty() {
    this.eventNameIsDirty = true;
  }

  ngOnDestroy(): void {
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
  }
}
