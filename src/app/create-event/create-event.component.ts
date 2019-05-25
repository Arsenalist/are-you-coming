import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service';
import {Event} from '../event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  public event: Event;

  constructor(private eventsService: EventsService ) { }

  ngOnInit(): void {
  }

  createEvent(eventName: string) {
    this.eventsService.createEvent(eventName).subscribe((event) => {
      this.event = event;
    });
  }
}
