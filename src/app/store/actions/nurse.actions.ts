import { createAction, props } from "@ngrx/store";
import { Expert } from "../../models/app-models.model";


export const getAllNursesStartedAction = createAction(
  '[Fetch Nurses] Started'
);

export const getAllNursesFinishedAction = createAction(
  '[Fetch Nurses] finished',
  props<{ nurses: Expert[] }>()
);

export const getAllNursesFailedAction = createAction(
  '[Fetch Nurses] failed'
);