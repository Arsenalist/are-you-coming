import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events/events.service';
import {Event} from '../event'

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.scss']
})
export class ViewEventDetailComponent implements OnInit {

  event: Event;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
  }

  getEvent(hash: string) {
    this.eventsService.getEventByHash(hash).subscribe(event => {
      this.event = event;
    })
  }
}
