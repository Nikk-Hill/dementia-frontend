import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignInState } from '../reducers/sign-in';

export const selectSignInState = createFeatureSelector<SignInState>('sign-in');

export const selectSignInResponse = createSelector(
  selectSignInState,
  (state: SignInState) => state.signInResponse
);
