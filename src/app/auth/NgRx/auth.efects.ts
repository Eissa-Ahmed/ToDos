import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppAction } from "./auth.allAction";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { IUser } from "../../interfaces/iuser";
import { IAuthenticationModel } from "../../interfaces/iauthentication-model";
import { IResponse } from "../../interfaces/iresponse";
import { Router } from "@angular/router";
import { continueWithGoogleAction } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private actions: Actions, private router: Router) { }

  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(AppAction.loginAction),
      exhaustMap(action =>
        this.authService.login(action.email, action.password).pipe(
          tap((res: IResponse<IAuthenticationModel | null>) => {
            console.log(res)
          }),
          map((res: IResponse<IAuthenticationModel | null>) =>
            AppAction.loginSuccessAction({
              user: {
                userName: res.Data?.Username,
                email: res.Data?.Email,
                id: res.Data?.Id,
                exp: new Date(res.Data?.TokenExpiration!)
              } as IUser
            })),
          catchError((err: IResponse<IAuthenticationModel | null>) => of(AppAction.loginFailAction({ error: err.Message })))
        )
      )
    )
  );

  loginWithGoogle$ = createEffect(() =>
    this.actions.pipe(
      ofType(AppAction.continueWithGoogleAction),
      exhaustMap(action =>
        this.authService.ContinueWithGoogle(action.Token).pipe(
          tap((res: IResponse<IAuthenticationModel | null>) => {
            console.log(res)
          }),
          map((res: IResponse<IAuthenticationModel | null>) =>
            AppAction.continueWithGoogleSuccessAction({
              user: {
                userName: res.Data?.Username,
                email: res.Data?.Email,
                id: res.Data?.Id,
                exp: new Date(res.Data?.TokenExpiration!)
              } as IUser
            })),
          catchError((err: IResponse<IAuthenticationModel | null>) => of(AppAction.loginFailAction({ error: err.Message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(AppAction.loginSuccessAction),
      tap((action) => {
        document.dispatchEvent(new CustomEvent('loginSuccess'));
        this.router.navigate(['/home']);
      })
    ), { dispatch: false }
  )
  loginWithGoogleSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(AppAction.continueWithGoogleSuccessAction),
      tap((action) => {
        document.dispatchEvent(new CustomEvent('loginSuccess'));
        this.router.navigate(['/home']);
      })
    ), { dispatch: false }
  )
}


