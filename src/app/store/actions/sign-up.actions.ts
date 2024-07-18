import { createAction, props } from "@ngrx/store";
import { SignUpResponse, UserDetails } from "../../models/app-models.model";

export const signUpInitiatedAction = createAction(
  '[Sign Up] Initiated',
  props<{ userDetails: UserDetails }>()
);

export const signUpSuccessAction = createAction(
  '[Sign Up] Success',
  props<{ signUpResponse: SignUpResponse }>()
);

export const signUpFailedAction = createAction(
  '[Sign Up] Failed',
  props<{ error: any }>()
);
