import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { BookingRequestService } from "../../services/booking-request.service";
import * as BookingRequestActions from "../actions/booking-request.actions";

@Injectable()
export class BookingRequestEffects {
  constructor(
    private actions$: Actions,
    private bookingRequestService: BookingRequestService
  ) { }

  bookingRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingRequestActions.bookingRequestInitiatedAction),
      mergeMap(action => 
        this.bookingRequestService.createBooking(action.bookingRequest).pipe(
          map(response => BookingRequestActions.bookingRequestFinishedAction()),
          catchError(error => of(BookingRequestActions.bookingRequestFailedAction()))
        )
      )
    )
  );
}