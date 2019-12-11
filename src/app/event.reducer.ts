import {Action, createReducer, on } from '@ngrx/store';
import {eventView, eventLoadedSuccess, userRsvps, rsvpDeleted, eventSaved} from './event.actions';

export interface AppState {
  userCookie: string;
  currentEvent: any | undefined;
}

const initialState: AppState = {
    userCookie: 'myCookie',
    currentEvent: {}
  };

const eventReducers = createReducer(
  initialState,
  on(eventView, state => state),
  on(userRsvps, state => state),
  on(rsvpDeleted, state => state),
  on(eventSaved, state => state),
  on(eventLoadedSuccess, (state, {payload}) => {
    const updatedCurrentEvent = state.currentEvent;
    updatedCurrentEvent[payload.hash] = payload;
    return (
      {
        ...state,
        currentEvent: updatedCurrentEvent
      }
    );
  })
);

export function reducer(state: AppState | undefined, action: Action) {
  return eventReducers(state, action);
}
