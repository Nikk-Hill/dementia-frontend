import { createAction, props } from "@ngrx/store";
import { Expert } from "../../models/app-models.model";


export const getAllExpertsStartedAction = createAction(
  '[Fetch Nurses] Started'
);

export const getAllExpertsFinishedAction = createAction(
  '[Fetch Experts] finished',
  props<{ experts: Expert[] }>()
);

export const getAllExpertsFailedAction = createAction(
  '[Fetch Experts] failed'
);