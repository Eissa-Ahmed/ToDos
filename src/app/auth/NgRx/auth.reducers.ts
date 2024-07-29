import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../interfaces/iuser";
import { AppAction } from "./auth.allAction";

export interface AuthState {
  user: IUser | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  error: null
}

export const authReducer = createReducer(
  initialAuthState,
  on(AppAction.loginSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user,
      error: null
    }
  }),
  on(AppAction.continueWithGoogleSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user,
      error: null
    }
  }),
  on(AppAction.loginFailAction, (state, action) => {
    return {
      ...state,
      error: action.error,
      user: null
    }
  })

)
