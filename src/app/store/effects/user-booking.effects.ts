import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserBookingsService } from "../../services/user-bookings.service";
import * as UserBookingActions from "../actions/user-booking.actions";
import { UserBooking } from "../../models/app-models.model";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserBookingEffects {
  constructor(
    private actions$: Actions,
    private userBookingService: UserBookingsService
  ) { }

  getAllBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserBookingActions.getAllBookingsStartedAction),
      mergeMap(action => 
        this.userBookingService.getAllBookings().pipe(
          map((userBookings: UserBooking[]) => UserBookingActions.getAllBookingsFinishedAction({ userBookings })),
          catchError(error => of(UserBookingActions.getAllBookingsFailedAction()))
        )
      )
    )
  );
}