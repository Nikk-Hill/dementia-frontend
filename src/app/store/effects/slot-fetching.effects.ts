import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import * as SlotFetchingAction from "../actions/slot-fetching.actions";
import { SlotFetchingService } from "../../services/slot-fetching.service";

@Injectable()
export class SlotFetchingEffects {
  constructor(
    private actions$: Actions,
    private slotFetchingService: SlotFetchingService
  ) { }

  fetchingSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SlotFetchingAction.getAllFreeSlotsStartedAction),
      mergeMap(action => 
        this.slotFetchingService.fetchSlots(action.expertId, action.date).pipe(
          map(response => SlotFetchingAction.getAllFreeSlotsFinishedAction({slots: response})),
          catchError(error => of(SlotFetchingAction.getAllFreeSlotsFailedAction()))
        )
      )
    )
  );
}