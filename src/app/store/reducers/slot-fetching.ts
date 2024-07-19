import { createReducer, on } from "@ngrx/store";
import * as SlotFetchingActions from "../actions/slot-fetching.actions";
import { ActionStatus } from "../../models/app-models.model";

export interface SlotFetchingState {
  slotFetchingStatus: ActionStatus;
  slots: string[]
}

export const initialState: SlotFetchingState = {
  slotFetchingStatus : ActionStatus.NOT_STARTED,
  slots: []
}

export const slotFetchingReducer = createReducer (
  initialState,
  on(SlotFetchingActions.getAllFreeSlotsStartedAction, (state: SlotFetchingState) => ({
    ...state,
    slotFetchingStatus: ActionStatus.PENDING
  })),
  on(SlotFetchingActions.getAllFreeSlotsFinishedAction, (state: SlotFetchingState, {slots: slots}) => ({
    ...state,
    slotFetchingStatus: ActionStatus.COMPLETED,
    slots: slots
  })),
  on(SlotFetchingActions.getAllFreeSlotsFailedAction, (state: SlotFetchingState) => ({
    ...state,
    slotFetchingStatus: ActionStatus.FAILED
  }))
)