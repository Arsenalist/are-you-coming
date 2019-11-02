import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EventsService } from './events/events.service';
import {eventView} from "./event.actions";


@Injectable()
export class EventEffects {

  loadEvent$ = createEffect(() => this.actions$.pipe(
    ofType(eventView),
    mergeMap((action) => this.eventsService.getEventByHash(action.hash)
      .pipe(
        map(event => ({ type: '[Events API] Event Loaded Success', payload: event })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}
}
