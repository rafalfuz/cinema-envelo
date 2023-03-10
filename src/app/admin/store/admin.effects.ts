import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { MovieService } from './admin-movie.service';
import { MovieActions, MovieApiActions } from './admin.actions';

@Injectable()
export class AdminEffects {
  toast = inject(ToastrService);
  private actions$ = inject(Actions);
  private adminService = inject(MovieService);

  getMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getMovies),
      switchMap(() => this.adminService.fetchMovies()),
      map((data) => MovieApiActions.getMoviesSuccess({ MovieData: data })),
      catchError(() => {
        this.toast.error('Najs error');
        return of(MovieApiActions.getMoviesFailure());
      })
    );
  });

  addMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.addMovie), /// najpierw wybiera sie akcje
      switchMap(({ movies }) => this.adminService.addMovie(movies)), /// krok po kroku co akcje maja zrobic, w tym przypadku strzal do bazy i przekaznaie props
      map((movie) => {
        /// w mapie mozna robic rozne czary, dodawac zmienne itd, robic filetry itd
        this.toast.success('Film zosatał dodany do bazy'); ///obsluga na sukces
        return MovieApiActions.addMoviesSuccess({ movie });
      }),
      catchError(() => {
        /// obsluga bledow
        this.toast.error('Nie udalo sie dodac filmu');
        return of(MovieApiActions.getMoviesFailure());
      })
    );
  });
}
