import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { create } from 'domain';
import { ToastrService } from 'ngx-toastr';
import { catchError, combineLatest, map, mergeMap, of, switchMap } from 'rxjs';
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
        this.toast.error(
          'Wystapił blad podczas pobierania filmow z bazy danych'
        );
        return of(MovieApiActions.getMoviesFailure());
      })
    );
  });

  addMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.addMovie),
      switchMap(({ movies }) => {
        const objectX = {
          movie: movies,
          day: '',
          hours: [],
        };

        return combineLatest([
          this.adminService.addMovie(movies),
          this.adminService.addToReperoireRecord(objectX),
        ]);
      }),
      map(([movie]) => {
        this.toast.success('Film zosatał dodany do bazy');
        return MovieApiActions.addMoviesSuccess({ movie });
      }),
      catchError(() => {
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
            this.toast.error('Nie udało się pobrać repertuaru');
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
      map((data) => {
        console.log(data);
        return MovieApiActions.addWizardRecordSuccess({
          newRepertuareRecord: data[1],
        });
      }),
      catchError(() => {
        this.toast.error('wrong');
        return of(MovieApiActions.addWizardRecordFailure());
      })
    );
  });

  getWeek$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getWeek),
      switchMap((data) => this.adminService.fetchDays()),
      map((data) => MovieApiActions.getWeekSuccess({ Week: data })),
      catchError(() => {
        this.toast.error('Nie mozna pobrac danych z tablicy week');
        return of(MovieApiActions.getWeekFailure());
      })
    );
  });
}
