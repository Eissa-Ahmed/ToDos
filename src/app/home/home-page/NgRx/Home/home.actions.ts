import { createAction, props } from "@ngrx/store";
import { IMedia } from "../../../../interfaces/imedia";


export interface IMediaModel {
  Title: string;
  Description: string;
  Medias: File[];
}

export const addTodoAction = createAction("[Home] Add Todo", props<{ todo: IMediaModel }>());
export const addTodoSuccessAction = createAction("[Home] Add Todo Success", props<{ todo: IMedia }>());
export const addTodoFailAction = createAction("[Home] Add Todo Fail", props<{ error: string }>());


export const getAllTodosAction = createAction("[Home] Get All Todos");
export const getAllTodosSuccessAction = createAction("[Home] Get All Success Todos", props<{ todos: IMedia[] }>());
export const getAllTodosErrorAction = createAction("[Home] Get All Error Todos", props<{ error: string }>());



export const deleteTodosAction = createAction("[Home] Delete Todos", props<{ id: string }>());
export const deleteTodosSuccessAction = createAction("[Home] Delete Success Todos");

