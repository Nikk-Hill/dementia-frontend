import { createAction, props } from "@ngrx/store";
import { UserBooking } from "../../models/app-models.model";


export const getAllBookingsStartedAction = createAction(
  '[Fetch User Bookings] Started'
);

export const getAllBookingsFinishedAction = createAction(
  '[Fetch User Bookings] finished',
  props<{ userBookings: UserBooking[] }>()
);

export const getAllBookingsFailedAction = createAction(
  '[Fetch User Bookings] failed'
);