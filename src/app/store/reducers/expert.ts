import { createReducer, on } from "@ngrx/store";
import { Expert } from "../../models/app-models.model";
import * as ExpertActions from "../actions/expert.actions";

export interface ExpertState {
  experts: Expert[]
}

export const initialState: ExpertState = {
  experts: []
}

export const expertReducer = createReducer(
  initialState,
  on(ExpertActions.getAllExpertsStartedAction, (state: ExpertState) => ({
    ...state
  })),
  on(ExpertActions.getAllExpertsFinishedAction, (state: ExpertState, { experts: experts }) => ({
    ...state,
    experts: experts
  })),
  on(ExpertActions.getAllExpertsFailedAction, (state: ExpertState) => ({
    ...state
  }))
)