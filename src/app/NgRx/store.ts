import { Action, createReducer, on } from '@ngrx/store';
let initialState = {
  n: 0
}

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        n: state.n + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        n: state.n - 1
      }
    default:
      return state
  }
}
