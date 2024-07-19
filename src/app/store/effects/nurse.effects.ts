import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { Expert } from "../../models/app-models.model";
import { ExpertService } from "../../services/experts.service";
import * as NurseActions from "../actions/nurse.actions";

@Injectable()
export class NurseEffects {
  constructor(
    private actions$: Actions,
    private expertService: ExpertService
  ) { }

  getAllExperts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NurseActions.getAllNursesStartedAction),
      mergeMap(action => 
        this.expertService.getAllNurses().pipe(
          map((nurses: Expert[]) => NurseActions.getAllNursesFinishedAction({ nurses: nurses })),
          catchError(error => of(NurseActions.getAllNursesFailedAction()))
        )
      )
    )
  );
}