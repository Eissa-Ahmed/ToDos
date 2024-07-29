import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HomeService } from "../../home/Service/home.service";
import { HomeActions } from "./home.allActions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { IMedia, Media } from "../../../../interfaces/imedia";
import { IResponse } from "../../../../interfaces/iresponse";
import { IPaginationInfo } from "../../../../interfaces/ipagination-info";

@Injectable()
export class HomeEffects {
  constructor(private homeService: HomeService, private actions: Actions, private toastr: ToastrService) {
  }

  addTodoEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.addTodoAction),
      exhaustMap((action) => this.homeService.addTodo(action.todo.Title, action.todo.Description, action.todo.Medias).pipe(
        map((response) => HomeActions.addTodoSuccessAction({ todo: response.Data! })),
        catchError((error) => of(HomeActions.addTodoFailAction({ error: error.Message })))
      ))
    )
  )

  getAllTodoEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.getAllTodosAction),
      exhaustMap((action) => this.homeService.getAllTodos().pipe(
        map((response: IResponse<IPaginationInfo<IMedia[]>>) => {
          // if (response.Success && response.Data) {
          //   console.log(1);
          //   response.Data = response.Data.map((media: IMedia) => {
          //     media.Medias = media.Medias.map((m: Media) => {
          //       m.Media = `data:image/${m.MediaName.split('.')[1]};base64,${m.Media}`;
          //       return m;
          //     });
          //     return media;
          //   })
          //   console.log("Success");
          // }
          return HomeActions.getAllTodosSuccessAction({ todos: response.Data?.Data! })
        }),
        tap((action) => console.log(action.todos)),
        catchError((error) => of(HomeActions.getAllTodosErrorAction({ error: "Something went wrong" })))
      ))
    )
  )

  addTodoSuccessEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.addTodoSuccessAction),
      tap((action) => {
        this.toastr.success('Todo added successfully');
        localStorage.setItem('todos', JSON.stringify(action.todo))
      })
    ), { dispatch: false }
  )

  getAllTodoSuccessEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.getAllTodosSuccessAction),
      tap((action) => {
        document.dispatchEvent(new CustomEvent('success'));
        //localStorage.setItem('todos', JSON.stringify(action.todos))
      })
    ), { dispatch: false }
  )

  getAllTodoErrorEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.getAllTodosErrorAction),
      tap((action) => {
        document.dispatchEvent(new CustomEvent('error'));
        this.toastr.error(action.error)
      })
    ), { dispatch: false }
  )

  DeleteTodoEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.deleteTodosAction),
      tap((action) => {
        // implement delete logic
      })
    ), { dispatch: false }
  )

  DeleteTodoSuccessEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(HomeActions.deleteTodosSuccessAction),
      tap((action) => {
        this.toastr.success("Todo deleted successfully");
      })
    ), { dispatch: false }
  )

}
