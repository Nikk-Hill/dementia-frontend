import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NurseState } from "../reducers/nurse";

export const selectNurseState = createFeatureSelector<NurseState>('nurses');

export const selectNurses = createSelector(
  selectNurseState,
  (state : NurseState) => state.nurses
);