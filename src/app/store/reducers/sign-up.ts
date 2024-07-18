import { createReducer, on } from "@ngrx/store";
import { SignUpResponse } from "../../models/app-models.model";
import * as SignUpActions from '../actions/sign-up.actions'

export interface SignUpState {
  signUpResponse: SignUpResponse | null;
  error: string;
}

export const initialState: SignUpState = {
  signUpResponse: null,
  error: ""
}

export const signUpReducer = createReducer(
  initialState,
  on(SignUpActions.signUpInitiatedAction, (state: SignUpState) =>({
    ...state,
  })),
  on(SignUpActions.signUpSuccessAction, (state: SignUpState, { signUpResponse }) => ({
    ...state,
    signUpResponse
  })),
  on(SignUpActions.signUpFailedAction, (state: SignUpState, { error }) => ({
    ...state,
    error
  }))
)
