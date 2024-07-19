import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExpertState } from "../reducers/expert";

export const selectExpertState = createFeatureSelector<ExpertState>('experts');

export const selectExperts = createSelector(
  selectExpertState,
  (state : ExpertState) => state.experts
);