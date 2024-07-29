import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HomeState } from "./home.reducer";
import * as fromUser from './home.reducer';
import { Media } from '../../../../interfaces/imedia';

export const selectTodosFeatures = createFeatureSelector<HomeState>('home');

export const selectTodos = createSelector(
  selectTodosFeatures,
  fromUser.selectAllTodos
);

export const selectIsLoaded = createSelector(
  selectTodosFeatures,
  (state) => state.isLoaded
);


