import { createReducer, on } from "@ngrx/store";
import { UserBooking } from "../../models/app-models.model";
import * as UserBookingActions from "../actions/user-booking.actions"

export interface UserBookingState {
  userBookings: UserBooking[]
}

export const initialState: UserBookingState = {
  userBookings: []
}

export const userBookingReducer = createReducer(
  initialState,
  on(UserBookingActions.getAllBookingsStartedAction, (state: UserBookingState) => ({
    ...state
  })),
  on(UserBookingActions.getAllBookingsFinishedAction, (state: UserBookingState, { userBookings }) => ({
    ...state,
    userBookings
  })),
  on(UserBookingActions.getAllBookingsFailedAction, (state: UserBookingState) => ({
    ...state
  }))
)