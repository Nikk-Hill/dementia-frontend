import { createReducer, on } from "@ngrx/store";
import { SignInResponse, UserDetails } from "../../models/app-models.model";
import * as SignInActions from "../actions/sign-in.actions";

export interface SignInState {
  userDetails: UserDetails | null;
  signInResponse: SignInResponse | null;
  error: string;
}

export const initialState: SignInState = {
  userDetails: null,
  signInResponse: null,
  error: ""
}

export const signInReducer = createReducer(
  initialState,
  on(SignInActions.signInInitiatedAction, (state: SignInState, { userDetails }) =>({
    ...state,
    userDetails,
    signInResponse: null,
  })),
  on(SignInActions.signInSuccessAction, (state: SignInState, { signInResponse }) => ({
    ...state,
    signInResponse
  })),
  on(SignInActions.signInFailedAction, (state: SignInState, { error }) => ({
    ...state,
    error
  }))
)
