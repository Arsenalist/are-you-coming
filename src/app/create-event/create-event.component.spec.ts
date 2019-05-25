import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import {By} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {EventsService} from '../events/events.service';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Event} from '../event';


describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventComponent ],
      imports: [HttpClientTestingModule],
      providers: [EventsService, HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log('For sure');
  });
  it('should have an input box for event name', () => {
    expect(fixture.debugElement.query(By.css('.event-name'))).toBeTruthy();
  });
  it('should have a button for creating an event', () => {
    expect(fixture.debugElement.query(By.css('.create-event'))).toBeTruthy();
  });
  it('should not display any event URLs since event has not been created yet', () => {
    expect(fixture.debugElement.query(By.css('.event-url'))).toBeNull();
  });
  it('creating an event should display the URL of the created event', () => {
    const newEvent: Event = {
      id: 1,
      name: 'Party at my house',
      permalink: 'http://somethingunique.example.com'
    };
    const eventsService = TestBed.get(EventsService);
    spyOn(eventsService, 'createEvent').and.returnValue(of(newEvent));
    component.createEvent(newEvent.name);
    expect(component.event.id).toBe(newEvent.id);

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.event-permalink'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.event-permalink')).nativeElement.value).toBe(newEvent.permalink);
  });
  it('clicking on the button calls the createEvent method', async(() => {
    spyOn(component, 'createEvent');
    fixture.debugElement.nativeElement.querySelector('.create-event').click();
    fixture.whenStable().then(() => {
      expect(component.createEvent).toHaveBeenCalled();
    });
  }));
});
