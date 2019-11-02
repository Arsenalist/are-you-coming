import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service';
import {Event} from '../event'
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.scss']
})
export class ViewEventDetailComponent implements OnInit {

  event: Event;

  constructor(private eventsService: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getEvent(params['event_hash']);
    });
  }

  getEvent(hash: string) {
    this.eventsService.getEventByHash(hash).subscribe(event => {
      this.event = event;
    })
  }

  public rsvpYes() {
    this.eventsService.rsvp({rsvp: 'yes', hash: this.event.hash});
  }
}
