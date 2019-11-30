import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service';
import {Event} from '../event';
import {PermalinkMakerService} from "../permalink-maker.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  public event: Event;
  public eventName: string;

  constructor(private eventsService: EventsService, private permalinkService: PermalinkMakerService) { }

  ngOnInit(): void {
  }

  createEvent() {
    this.eventsService.createEvent(this.eventName).subscribe((event) => {
      this.event = event;
    });
  }

  linkValue() {
    return this.permalinkService.permalink(this.event.permalink);
  }
}
