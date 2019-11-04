import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {EventsService} from './events/events.service';
import {eventLoadedSuccess, eventView, userRsvps} from "./event.actions";


@Injectable()
export class EventEffects {

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}

  loadEvent$ = createEffect(() => this.actions$.pipe(
    ofType(eventView),
    mergeMap((action) => {
        console.log("in the service to geteventbyahs ", action)
        return this.eventsService.getEventByHash(action.hash).pipe(
          map(event => ({type: eventLoadedSuccess.type, payload: event})),
          catchError(() => EMPTY)
        );
      }
    )
    )
  );

  userRsvps$ = createEffect(() => this.actions$.pipe(
    ofType(userRsvps),
    map(action => {
      console.log("in the effect for userRsvps ", action);
      this.eventsService.rsvp(action.hash, action.rsvp).pipe(
        map(() => null),
        catchError(() => EMPTY)
      ).subscribe(()=>null);
      return action.hash;
    }),
    map((hash) => ({type: eventView.type, hash: hash}))
    )
  );
}
