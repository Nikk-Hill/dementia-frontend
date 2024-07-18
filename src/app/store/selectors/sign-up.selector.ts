import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SignUpState } from "../reducers/sign-up";


export const selectSignUpState = createFeatureSelector<SignUpState>('sign-up');

export const selectSignUpResponse = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.signUpResponse
);