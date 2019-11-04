import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {EventFacade} from './event-facade';
import {AppState} from "./event.reducer";
import {cold} from 'jasmine-marbles';
import {EventsService} from "./events/events.service";

describe('EventFacadeService', () => {
  describe('EventFacadeService.initializeCurrentEvent', () => {
    let store: MockStore<AppState>;
    const initialState =
      {
        appState:
          {
            currentEvent: {
              id: 2,
              name: 'Royal Rumble',
              hash: 'abc123',
              permalink: 'http://royalrumblehash.example.com'
            }
          }
      };
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          EventFacade,
          EventsService,
          provideMockStore({initialState}),
        ]
      });
      store = TestBed.get(Store);
    });

    it('should be created', () => {
      const service: EventFacade = TestBed.get(EventFacade);
      expect(service).toBeTruthy();
    });
    it('should return the current event as an observable', () => {
      const currentEvent = {
        id: 2,
        name: 'Royal Rumble',
        hash: 'abc123',
        permalink: 'http://royalrumblehash.example.com'
      };
      const expected = cold('(a)', {a: currentEvent});
      const eventFacade: EventFacade = TestBed.get(EventFacade);
      expect(eventFacade.initializeCurrentEvent()).toBeObservable(expected);
    });
  });
});
