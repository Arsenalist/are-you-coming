import {Action, createReducer, on } from '@ngrx/store';
import { eventView, eventLoadedSuccess, userRsvps } from './event.actions';
import { Event } from './event';

export interface AppState {
  userCookie: string;
  currentEvent: Event | undefined;
}

const initialState: AppState = {
    userCookie: 'myCookie',
    currentEvent: undefined
  };

const eventReducers = createReducer(
  initialState,
  on(eventView, state => state),
  on(userRsvps, state => state),
  on(eventLoadedSuccess, (state, {payload}) => ({
      ...state,
      currentEvent: payload
    }
  ))
);

export function reducer(state: AppState | undefined, action: Action) {
  return eventReducers(state, action);
}
