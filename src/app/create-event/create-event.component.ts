import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service';
import {Event} from '../event';
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  public event: Event;
  public eventName: string;

  constructor(private eventsService: EventsService ) { }

  ngOnInit(): void {
  }

  createEvent() {
    console.log("creating with ", this.eventName);
    this.eventsService.createEvent(this.eventName).subscribe((event) => {
      this.event = event;
    });
  }

  linkValue() {
    return location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + '/events' + this.event.permalink;
  }
}
