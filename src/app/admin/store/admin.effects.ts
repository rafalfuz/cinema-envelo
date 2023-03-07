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
      //   startWith(MovieActions.getMovies),
      switchMap(() => this.adminService.fetchMovies()),
      map((data) => MovieApiActions.getMoviesSuccess({ MovieData: data })),
      catchError(() => {
        this.toast.error('Najs error');
        return of(MovieApiActions.getMoviesFailure());
      })
    );
  });
}
