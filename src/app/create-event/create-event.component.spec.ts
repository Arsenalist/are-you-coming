import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import {by, element} from 'protractor';
import {By} from '@angular/platform-browser';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventComponent ]
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
});
