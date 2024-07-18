import { createAction, props } from "@ngrx/store";
import { Restaurant } from "../../models/app-models.model";


export const getAllRestaurantsStartedAction = createAction(
  '[Fetch Restaurants] Started'
);

export const getAllRestaurantsFinishedAction = createAction(
  '[Fetch Restaurants] finished',
  props<{ restaurants: Restaurant[] }>()
);

export const getAllRestaurantsFailedAction = createAction(
  '[Fetch Restaurants] failed'
);