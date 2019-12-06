import {Injectable} from '@angular/core';
import {createSelector, select, Store} from "@ngrx/store";
import {AppState} from "./event.reducer";
import {eventView, userRsvps, rsvpDeleted, eventSaved} from "./event.actions";
import {Event, Rsvp} from "./event";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventFacade {

  constructor(private store: Store<AppState>) { }

  public viewEvent(hash: string) {
    this.store.dispatch(eventView({hash: hash}));
  }

  public initializeCurrentEvent(): Observable<Event> {
    const selectCurrentEvent = (state: AppState) => state.currentEvent ;
    const selector = createSelector(selectCurrentEvent, (selectCurrentEvent: Event) => selectCurrentEvent );
    return this.store.pipe(
      select('appState'),
      select(selector)
    );
  }

  public recordRsvp(rsvp: Rsvp) {
    console.log("in recordRsvp in event facade")
    this.store.dispatch(userRsvps({hash: rsvp.eventHash, rsvp: rsvp}))
  }

  public deleteRsvp(rsvp: Partial<Rsvp>) {
    this.store.dispatch(rsvpDeleted({partialRsvp: rsvp}))
  }

  public saveEvent(event: Partial<Event>) {
    this.store.dispatch(eventSaved({partialEvent: event}))
  }
}
