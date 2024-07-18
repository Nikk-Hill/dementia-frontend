import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { Restaurant } from "../../models/app-models.model";
import { RestaurantService } from "../../services/restaurants.service";
import * as RestaurantActions from "../actions/restaurant.actions";

@Injectable()
export class RestaurantEffects {
  constructor(
    private actions$: Actions,
    private restaurantService: RestaurantService
  ) { }

  getAllBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.getAllRestaurantsStartedAction),
      mergeMap(action => 
        this.restaurantService.getAllRestaurants().pipe(
          map((restaurants: Restaurant[]) => RestaurantActions.getAllRestaurantsFinishedAction({ restaurants })),
          catchError(error => of(RestaurantActions.getAllRestaurantsFailedAction()))
        )
      )
    )
  );
}