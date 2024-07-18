import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserBookingState } from "../reducers/user-booking";

export const selectUserBookingState = createFeatureSelector<UserBookingState>('user-booking');

export const selectUserBookings = createSelector(
  selectUserBookingState,
  (state : UserBookingState) => state.userBookings
);