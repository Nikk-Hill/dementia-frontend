import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SignInActions from "../actions/sign-in.actions";
import { catchError, from, map, mergeMap, of, switchMap } from "rxjs";
import { SignInService } from "../../services/sign-in.service";
import { SignInResponse } from "../../models/app-models.model";


@Injectable()
export class SignInEffects {

  constructor(
    private actions$: Actions,
    private readonly signInService: SignInService
  ) { }

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignInActions.signInInitiatedAction),
      mergeMap(action =>
        this.signInService.signUserIn(action.userDetails).pipe(
          map((signInResponse: SignInResponse) => SignInActions.signInSuccessAction({ signInResponse })),
          catchError(error => of(SignInActions.signInFailedAction({ error })))
        )
      )
    )
  );
  
  
}