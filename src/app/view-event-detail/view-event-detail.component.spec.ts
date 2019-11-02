import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventDetailComponent } from './view-event-detail.component';
import {Event, RsvpType} from "../event";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EventsService} from "../events/events.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

describe('ViewEventDetailComponent', () => {
  let component: ViewEventDetailComponent;
  let fixture: ComponentFixture<ViewEventDetailComponent>;

  const event: Event = {
    id: 2,
    name: 'Royal Rumble',
    hash: 'abc123',
    permalink: 'http://royalrumblehash.example.com'
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventDetailComponent ],
      imports: [HttpClientTestingModule],
      providers: [EventsService, HttpClient, {
        provide: ActivatedRoute,
        useValue: {
          params: of({'event_hash': 'royalrumblehash'})
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
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'getEventByHash').and.returnValue(of(event));
    component.getEvent('royalrumblehash');
    expect(component.event.id).toBe(event.id);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.event-permalink')).nativeElement.value).toBe(event.permalink);
    expect(fixture.debugElement.query(By.css('.event-name')).nativeElement.innerHTML).toEqual(event.name);
  });

  it('should display a Yes or No button to indicate if a person is coming or not', () => {
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'getEventByHash').and.returnValue(of(event));
    component.getEvent('royalrumblehash');
    expect(component.event.id).toBe(event.id);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.rsvp-yes')).nativeElement).toBeDefined();
    expect(fixture.debugElement.query(By.css('.rsvp-no')).nativeElement).toBeDefined();
  });

  it('Clicking on Yes should invoke service call', () => {
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'getEventByHash').and.returnValue(of(event));
    spyOn(eventsService, 'rsvp');
    component.getEvent('abc123');
    component.rsvpYes();
    expect(eventsService.rsvp).toHaveBeenCalledWith({rsvp: 'yes', hash: 'abc123'});
  });

  it('Clicking on No should invoke service call', () => {
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'getEventByHash').and.returnValue(of(event));
    spyOn(eventsService, 'rsvp');
    component.getEvent('abc123');
    component.rsvpNo();
    expect(eventsService.rsvp).toHaveBeenCalledWith({rsvp: 'no', hash: 'abc123'});
  });

  it('Should display all the people who have RSVPd with what their RSVP was', () => {
    const event: Event = {
      id: 2,
      name: 'Quirkish Delight Episode 3',
      hash: 'quirkish-delight-3',
      permalink: 'http://quirkishdelight.example.com',
      rsvps: [
        {name: 'Caitlin', rsvp: RsvpType.YES},
        {name: 'Sana', rsvp: RsvpType.YES},
        {name: 'Zarar', rsvp: RsvpType.NO},
      ]
    };
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'getEventByHash').and.returnValue(of(event));
    component.getEvent('abc123');
    expect(component.hasRsvps()).toBe(true);
    expect(component.event.id).toBe(event.id);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('div.rsvps div')).length).toBe(3);
  });

  it('Should display a message when nobody has RSVPd yet with rsvps being an empty list', () => {
    const event: Event = {
      id: 2,
      name: 'Quirkish Delight Episode 3',
      hash: 'quirkish-delight-3',
      permalink: 'http://quirkishdelight.example.com',
      rsvps: []
    };
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'getEventByHash').and.returnValue(of(event));
    component.getEvent('abc123');
    fixture.detectChanges();
    expect(component.hasRsvps()).toBe(false);
    expect(fixture.debugElement.query(By.css('div.rsvps'))).toBeNull();
    expect(fixture.debugElement.query(By.css('div.no-rsvps')).nativeElement.innerHTML).toBeDefined();
  });

  it('Should display a message when nobody has RSVPd yet with rsvps being undefined', () => {
    const event: Event = {
      id: 2,
      name: 'Quirkish Delight Episode 3',
      hash: 'quirkish-delight-3',
      permalink: 'http://quirkishdelight.example.com'
    };
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'getEventByHash').and.returnValue(of(event));
    component.getEvent('abc123');
    fixture.detectChanges();
    expect(component.hasRsvps()).toBe(false);
    expect(fixture.debugElement.query(By.css('div.rsvps'))).toBeNull();
    expect(fixture.debugElement.query(By.css('div.no-rsvps')).nativeElement.innerHTML).toBeDefined();
  });
});
