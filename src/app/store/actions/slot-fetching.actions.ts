import { createAction, props } from "@ngrx/store";


export const getAllFreeSlotsStartedAction = createAction(
  '[Fetch Expert Bookings] Started',
  props<{ expertId: number, date: string  }>()
);

export const getAllFreeSlotsFinishedAction = createAction(
  '[Fetch Expert Bookings] finished',
  props<{ slots: string[] }>()
);

export const getAllFreeSlotsFailedAction = createAction(
  '[Fetch Expert Bookings] failed'
);