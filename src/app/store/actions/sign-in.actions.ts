import { createAction, props } from "@ngrx/store";
import { SignInResponse, UserDetails } from "../../models/app-models.model";

export const signInInitiatedAction = createAction(
  '[Sign In] Initiated',
  props<{ userDetails: UserDetails }>()
);

export const signInSuccessAction = createAction(
  '[Sign In] Success',
  props<{ signInResponse: SignInResponse }>()
);

export const signInFailedAction = createAction(
  '[Sign In] Failed',
  props<{ error: any }>()
);
