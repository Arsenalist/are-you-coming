import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import {By} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EventsService} from '../events/events.service';
import {delay} from 'rxjs/operators';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventComponent ],
      imports: [HttpClientModule],
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
  });
  it('should have an input box for event name', () => {
    expect(fixture.debugElement.query(By.css('.event-name'))).toBeTruthy();
  });
  it('should have a button for creating an event', () => {
    expect(fixture.debugElement.query(By.css('.create-event'))).toBeTruthy();
  });
  it('should store the event as part of the instance variable', async () => {
    component.createEvent('Party at my house');
    await delay(500);
    expect(component.event.id).toBe(1);

  });
});
