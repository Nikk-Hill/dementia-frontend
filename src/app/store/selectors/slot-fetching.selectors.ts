import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SlotFetchingState } from "../reducers/slot-fetching";


export const selectSlotFetchingState = createFeatureSelector<SlotFetchingState>('slot-fetching');

export const selectBookingRequestStatus = createSelector(
  selectSlotFetchingState,
  (state : SlotFetchingState) => state.slotFetchingStatus
);

export const selectSlots = createSelector(
  selectSlotFetchingState,
  (state : SlotFetchingState) => state.slots
);