import { createReducer, on } from "@ngrx/store";
import { Restaurant } from "../../models/app-models.model";
import * as RestaurantActions from "../actions/restaurant.actions";

export interface RestaurantState {
  restaurants: Restaurant[]
}

export const initialState: RestaurantState = {
  restaurants: []
}

export const restaurantReducer = createReducer(
  initialState,
  on(RestaurantActions.getAllRestaurantsStartedAction, (state: RestaurantState) => ({
    ...state
  })),
  on(RestaurantActions.getAllRestaurantsFinishedAction, (state: RestaurantState, { restaurants }) => ({
    ...state,
    restaurants
  })),
  on(RestaurantActions.getAllRestaurantsFailedAction, (state: RestaurantState) => ({
    ...state
  }))
)