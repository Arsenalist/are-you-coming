import { Injectable } from '@angular/core';
import {createSelector, select, Store} from "@ngrx/store";
import {AppState} from "./event.reducer";
import {eventView} from "./event.actions";
import {Event} from "./event";
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
    return this.store.pipe(select('appState'), select(selector));
  }

}
