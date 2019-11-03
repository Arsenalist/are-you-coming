import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError, tap} from 'rxjs/operators';
import {EventsService} from './events/events.service';
import {eventView, eventLoadedSuccess} from "./event.actions";


@Injectable()
export class EventEffects {

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}

  loadEvent$ = createEffect(() => this.actions$.pipe(
    ofType(eventView),
    mergeMap((action) => {
        return this.eventsService.getEventByHash(action.hash).pipe(
          map(event => ({type: eventLoadedSuccess.type, payload: event})),
          catchError(() => EMPTY)
        );
      }
    )
    )
  );
}
