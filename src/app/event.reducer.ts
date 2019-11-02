import { createReducer, on } from '@ngrx/store';
import { eventView } from './event.actions';
import { Event } from './event';

export const initialState = {currentEvent: Event};

const _eventReducer = createReducer(initialState,
  on(eventView, state => state),
);

export function eventReducer(state, action) {
  return _eventReducer(state, action);
}
