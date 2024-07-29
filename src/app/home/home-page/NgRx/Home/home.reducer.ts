import { ActionReducerMap, combineReducers, createReducer, on } from "@ngrx/store";
import { IMedia } from "../../../../interfaces/imedia";
import { HomeActions } from "./home.allActions";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// export interface HomeState {
//   todos: IMedia[];
// }

export interface HomeState extends EntityState<IMedia> {
  isLoaded: boolean;
}
export function selectTodoId(a: IMedia): string {
  return a.Id;
}

export function sortByName(a: IMedia, b: IMedia): number {
  return a.Title.localeCompare(b.Title);
}

export const adapter: EntityAdapter<IMedia> = createEntityAdapter<IMedia>({
  selectId: selectTodoId,
  sortComparer: sortByName
});

export const initialHomeState: HomeState = adapter.getInitialState({
  isLoaded: false
});


const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectTodosIds = selectIds;

// select the dictionary of todos entities
export const selectTodosEntities = selectEntities;

// select the array of todos
export const selectAllTodos = selectAll;

// select the total todos count
export const selectTodosTotal = selectTotal;

export const homeReducer = createReducer(
  initialHomeState,
  on(HomeActions.addTodoSuccessAction, (state, action) => {
    return adapter.addOne(action.todo, state)
  }),
  on(HomeActions.getAllTodosSuccessAction, (state, action) => {
    return adapter.setAll(action.todos, { ...state, isLoaded: true })
  }),
  // on(HomeActions.updateTodoSuccessAction, (state, action) => {
  //   return adapter.updateOne(action.todo, state)
  // }),
  on(HomeActions.deleteTodosAction, (state, action) => {
    return adapter.removeOne(action.id, state)
  })
)

// export const homeReducer2 = createReducer(
//   initialHomeState,
//   on(HomeActions.addTodoSuccessAction, (state, action) => {
//     return {
//       ...state,
//       todos: [...state.todos, action.todo]
//     }
//   })
// )

// export const mainReducer: ActionReducerMap<any> = combineReducers({
//   home: homeReducer,
//   home2: homeReducer2
// })


