import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { Expert } from "../../models/app-models.model";
import { ExpertService } from "../../services/experts.service";
import * as ExpertActions from "../actions/expert.actions";

@Injectable()
export class ExpertEffects {
  constructor(
    private actions$: Actions,
    private expertService: ExpertService
  ) { }

  getAllExperts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpertActions.getAllExpertsStartedAction),
      mergeMap(action => 
        this.expertService.getAllDoctors().pipe(
          map((experts: Expert[]) => ExpertActions.getAllExpertsFinishedAction({ experts: experts })),
          catchError(error => of(ExpertActions.getAllExpertsFailedAction()))
        )
      )
    )
  );
}