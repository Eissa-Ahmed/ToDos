import { createAction, props } from "@ngrx/store";
import { ILogin } from "../../interfaces/ilogin";
import { IUser } from "../../interfaces/iuser";

export const loginAction = createAction('[Auth] Login', props<ILogin>());
export const loginSuccessAction = createAction('[Auth] Login Success', props<{ user: IUser }>());
export const loginFailAction = createAction('[Auth] Login Fail', props<{ error: string }>());

export const logoutAction = createAction('[Auth] Logout');
export const continueWithGoogleAction = createAction('[Auth] Continue With Google', props<{ Token: string }>());
export const continueWithGoogleSuccessAction = createAction('[Auth] Login With Google Success', props<{ user: IUser }>());

