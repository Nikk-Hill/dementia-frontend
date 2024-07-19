import { createReducer, on } from "@ngrx/store";
import { Expert } from "../../models/app-models.model";
import * as NurseActions from "../actions/nurse.actions";

export interface NurseState {
  nurses: Expert[]
}

export const initialState: NurseState = {
  nurses: []
}

export const nurseReducer = createReducer(
  initialState,
  on(NurseActions.getAllNursesStartedAction, (state: NurseState) => ({
    ...state
  })),
  on(NurseActions.getAllNursesFinishedAction, (state: NurseState, { nurses: nurses }) => ({
    ...state,
    nurses: nurses
  })),
  on(NurseActions.getAllNursesFailedAction, (state: NurseState) => ({
    ...state
  }))
)