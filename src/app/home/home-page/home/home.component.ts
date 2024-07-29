import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeActions } from '../NgRx/Home/home.allActions';
import { IMedia } from '../../../interfaces/imedia';
import { selectIsLoaded, selectTodos } from '../NgRx/Home/home.selectors';
import { Observable } from 'rxjs';
import { IMediaModel } from '../NgRx/Home/home.actions';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  option = {
    path: 'assets/Images/loading.json',
  };
  medias!: Observable<IMedia[]>
  isLoading: WritableSignal<boolean> = signal<boolean>(false)
  constructor(private store: Store) {
    this.medias = this.store.select(selectTodos);
  }

  ngOnInit(): void {
    this.loadTodos();
    this.trackLoading();
  }
  add() {
    //this.store.dispatch(HomeActions.addTodoAction({ todo: { Title: 'test2hgj', Description: 'test2h2345 df', Medias: [] as File[] } as IMediaModel }));

    this.store.select(selectTodos).subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }
  loadTodos() {
    //this.isLoading.set(true);
    this.store.select(selectIsLoaded).subscribe({
      next: (data) => {
        this.isLoading.set(!data);
        console.log("-----");
        console.log(data);
        console.log("-----");

      }
    });

    //this.store.dispatch(HomeActions.getAllTodosAction())
  }
  onDeleted(id: string) {
    this.store.dispatch(HomeActions.deleteTodosAction({ id: id }));
  }

  trackLoading() {
    document.addEventListener('success', (event) => {
      this.hideLoader();
    })
    document.addEventListener('error', (event) => {
      this.hideLoader();
    })
  }
  hideLoader() {
    this.isLoading.set(false);
  }
  ngOnDestroy(): void {
    document.removeEventListener('success', () => {
      this.hideLoader();
    })
  }
}


