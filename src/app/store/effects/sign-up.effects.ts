import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { SignUpResponse } from "../../models/app-models.model";
import { SignUpService } from "../../services/sign-up.service";
import * as SignUpActions from "../actions/sign-up.actions";

@Injectable()
export class SignUpEffects {

  constructor(
    private actions$: Actions,
    private readonly signUpService: SignUpService
  ) { }

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUpActions.signUpInitiatedAction),
      mergeMap(action =>
        this.signUpService.signUserUp(action.userDetails).pipe(
          map((signUpResponse: SignUpResponse) =>
            SignUpActions.signUpSuccessAction({ signUpResponse })),
          catchError(error => of(SignUpActions.signUpFailedAction({ error })))
        )
      )
    )
  );
}