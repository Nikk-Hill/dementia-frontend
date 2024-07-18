import { createReducer, on } from "@ngrx/store";
import * as BookingRequestActions from "../actions/booking-request.actions";
import { ActionStatus } from "../../models/app-models.model";

export interface BookingRequestState {
  bookingRequestStatus: ActionStatus;
}

export const initialState: BookingRequestState = {
  bookingRequestStatus : ActionStatus.NOT_STARTED
}

export const bookingRequestReducer = createReducer (
  initialState,
  on(BookingRequestActions.bookingRequestInitiatedAction, (state: BookingRequestState) => ({
    ...state,
    bookingRequestStatus: ActionStatus.PENDING
  })),
  on(BookingRequestActions.bookingRequestFinishedAction, (state: BookingRequestState) => ({
    ...state,
    bookingRequestStatus: ActionStatus.COMPLETED
  })),
  on(BookingRequestActions.bookingRequestFailedAction, (state: BookingRequestState) => ({
    ...state,
    bookingRequestStatus: ActionStatus.FAILED
  }))
)