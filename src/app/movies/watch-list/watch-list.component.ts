import { Component, inject } from '@angular/core';
import { Movies } from 'models';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { MoviesService } from '../movies.service';
import { WatchListService } from './watch-list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent {
  watchListService = inject(WatchListService);
  movieService = inject(MoviesService);
  authService = inject(AuthService);

  listOfAllMoviesInDB$ = this.watchListService.watchList$;
  currentUser$ = this.authService.auth$;
  showList = this.getShowList();

  private getShowList() {
    return combineLatest([
      this.movieService.moviesBank$,
      this.listOfAllMoviesInDB$,
      this.currentUser$,
    ]).pipe(
      map(([listOfAllMoviesInDB, moviesInState, currentUser]) => {
        const matchingRecordsInMoviesInStateToUsers = moviesInState.filter(
          (movieInState) => movieInState.idUser === currentUser.id
        );
        const movieTitlesFromList = matchingRecordsInMoviesInStateToUsers.map(
          (result) => result.movie
        );
        return listOfAllMoviesInDB.filter((movie) =>
          movieTitlesFromList.includes(movie.id)
        );
      })
    );
  }
}
