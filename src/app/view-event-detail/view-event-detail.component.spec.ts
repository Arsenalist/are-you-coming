import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventDetailComponent } from './view-event-detail.component';
import {Event} from "../event";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EventsService} from "../events/events.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

describe('ViewEventDetailComponent', () => {
  let component: ViewEventDetailComponent;
  let fixture: ComponentFixture<ViewEventDetailComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventDetailComponent ],
      imports: [HttpClientTestingModule],
      providers: [EventsService, HttpClient, {
        provide: ActivatedRoute,
        useValue: {
          params: of({'event_hash': 'abc123'})
        }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display event details', () => {
    const event: Event = {
      id: 2,
      name: 'Royal Rumble',
      hash: 'abc123',
      permalink: 'http://abc123.example.com'
    };
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'getEventByHash').and.returnValue(of(event));
    component.getEvent('abc123');
    expect(component.event.id).toBe(event.id);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.event-permalink')).nativeElement.value).toBe(event.permalink);
    expect(fixture.debugElement.query(By.css('.event-name')).nativeElement.innerHTML).toEqual(event.name);
  });
});
