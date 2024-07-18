import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RestaurantState } from "../reducers/restaurant";

export const selectRestaurantState = createFeatureSelector<RestaurantState>('restaurants');

export const selectRestaurants = createSelector(
  selectRestaurantState,
  (state : RestaurantState) => state.restaurants
);