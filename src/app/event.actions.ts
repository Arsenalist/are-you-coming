import { createAction, props } from '@ngrx/store';
import {Rsvp} from "./event";

export const eventView = createAction(
  '[View Event] Event Viewed',
  props<{ hash: string }>()
);
export const eventLoadedSuccess = createAction(
  '[Events API] Event Loaded Success',
  props<{ payload: any}>()
);
export const userRsvps = createAction(
  '[View Event] User submits Rsvp',
  props<{ hash: string, rsvp: Rsvp }>()
);
export const rsvpDeleted = createAction(
  '[View Event] User deletes Rsvp',
  props<{partialRsvp: Partial<Rsvp>}>()
);

