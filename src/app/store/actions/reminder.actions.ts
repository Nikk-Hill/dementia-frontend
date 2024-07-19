import { createAction, props } from "@ngrx/store";
import { Reminder } from "../../models/app-models.model";


export const getAllRemindersStartedAction = createAction(
  '[Fetch Reminder] Started'
);

export const getAllRemindersFinishedAction = createAction(
  '[Fetch Reminder] finished',
  props<{ reminders: Reminder[] }>()
);

export const getAllRemindersFailedAction = createAction(
  '[Fetch Reminder] failed'
);