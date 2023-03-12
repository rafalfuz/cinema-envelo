import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { create } from 'domain';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  combineLatest,
  map,
  mergeMap,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Reperoire } from 'src/app/movies/movies.interface';
import { ShowingDatas, ShowingRecord } from 'src/app/order/order.interface';
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
      switchMap(({ movies }) => {
        const objectX = {
          movies: movies,
          day: '',
          hours: [],
        };

        return combineLatest([
          this.adminService.addMovie(movies),
          this.adminService.addToReperoireRecord(objectX),
        ]);
      }), /// krok po kroku co akcje maja zrobic, w tym przypadku strzal do bazy i przekaznaie props
      map(([movie]) => {
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

  getRepertoireRecord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getRepertuare),
      mergeMap(({ movieId }) => {
        return this.adminService.fetchReperoire().pipe(
          map((repertoire) => {
            const filteredRepertoire = repertoire.filter(
              (data) => data.movie.id === movieId
            );
            return MovieApiActions.getRepertuareSuccess({
              RepertuareData: filteredRepertoire,
            });
          }),
          catchError(() => {
            this.toast.error('Nie udało się pobrać repertuaru1');
            return of(MovieApiActions.getRepertuareFailure());
          })
        );
      })
    );
  });

  getRooms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getRooms),
      switchMap(() => this.adminService.fetchRooms()),
      map((data) => {
        return MovieApiActions.getRoomsSuccess({ RoomData: data });
      }),
      catchError(() => {
        this.toast.error('Sale cos sie nie chca pobrac');
        return of(MovieApiActions.getMoviesFailure());
      })
    );
  });

  addWizardRecord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.addWizardRecord),
      map((data) => {
        console.log(data);
        let date = `${data.wizardFormRecord.dayOfScreening}`;
        let parts = date.split('-');
        let year = parts[2].slice(-2);
        let newDate = parts[0] + '-' + parts[1] + '-' + year;

        const createId = `${newDate}-${data.wizardFormRecord.startTime
          .split(':')
          .join('-')}-${data.wizardFormRecord.room.name.toLowerCase()}-${
          data.movie.movie.id
        }`;

        const showingRecord: ShowingRecord = {
          id: createId,
          roomId: data.wizardFormRecord.room.id,
          movieId: data.movie.movie.id,
          time: data.wizardFormRecord.startTime,
          day: data.wizardFormRecord.dayOfScreening,
          soldSeats: [],
        };

        const reperoire = {
          movie: data.movie.movie,
          day: data.wizardFormRecord.dayOfScreening,
          hours: [
            {
              time: data.wizardFormRecord.startTime,
              roomId: data.wizardFormRecord.room.id,
              showingId: createId,
            },
          ],
        };
        console.log(showingRecord, reperoire);
        return { showingRecord, reperoire };
      }),
      switchMap(({ showingRecord, reperoire }) => {
        return combineLatest([
          this.adminService.addToShowingRecord(showingRecord),
          this.adminService.addToReperoireRecord(reperoire),
        ]);
      }),
      map(() => {
        return MovieApiActions.addWizardRecordSuccess();
      }),
      catchError(() => {
        this.toast.error('wrong');
        return of(MovieApiActions.addWizardRecordFailure());
      })
    );
  });
}
