import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ViewEventDetailComponent } from './view-event-detail.component';
import {Event, RsvpType} from "../event";

describe('ViewEventDetailComponent', () => {
  let component: ViewEventDetailComponent;
  let fixture: ComponentFixture<ViewEventDetailComponent>;

  const event: Event = {
    id: 2,
    name: 'Royal Rumble',
    hash: 'abc123',
    permalink: 'http://royalrumblehash.example.com'
  };


});
