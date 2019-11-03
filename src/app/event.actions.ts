import { createAction, props } from '@ngrx/store';

export const eventView = createAction(
  '[View Event] Event Viewed',
  props<{ hash: string }>()
);
export const eventLoadedSuccess = createAction(
  '[Events API] Event Loaded Success',
  props<{ payload: any}>()
);
