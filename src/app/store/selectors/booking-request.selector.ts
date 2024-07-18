import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingRequestState } from "../reducers/booking-request";


export const selectBookingRequestState = createFeatureSelector<BookingRequestState>('booking-request');

export const selectBookingRequestStatus = createSelector(
  selectBookingRequestState,
  (state : BookingRequestState) => state.bookingRequestStatus
);