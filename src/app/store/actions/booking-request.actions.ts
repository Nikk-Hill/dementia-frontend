import { createAction, props } from "@ngrx/store";
import { BookingRequest } from "../../models/app-models.model";

export const bookingRequestInitiatedAction = createAction(
  '[Fetch User Bookings] Started',
  props<{ bookingRequest: BookingRequest }>()

);

export const bookingRequestFinishedAction = createAction(
  '[Fetch User Bookings] finished'
);

export const bookingRequestFailedAction = createAction(
  '[Fetch User Bookings] failed'
);