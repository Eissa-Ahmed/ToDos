import { ResolveFn } from '@angular/router';
import { HomeService } from '../home-page/home/Service/home.service';
import { inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectIsLoaded } from '../home-page/NgRx/Home/home.selectors';
import { finalize, first, tap } from 'rxjs';
import { HomeActions } from '../home-page/NgRx/Home/home.allActions';

export const resolveHomeResolver: ResolveFn<boolean> = (route, state) => {
  const homeService = inject(HomeService);
  const store = inject(Store);
  let isLoaded = false;

  return store.pipe(
    select(selectIsLoaded),
    tap((sisLoaded) => {
      if (!isLoaded && !sisLoaded) {
        isLoaded = true
        store.dispatch(HomeActions.getAllTodosAction())
      }
    }),
    first(),
    finalize(() => {
      isLoaded = false
    })
    //select(selectIsLoaded),

  )
};
