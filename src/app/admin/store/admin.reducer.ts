import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { MovieApiActions } from './admin.actions';
import { initialMovieState } from './admin.state';

export const MovieReducer = createReducer(
  // sluzy do updateowania store
  initialMovieState,
  on(MovieApiActions.getMoviesSuccess, (state, { MovieData }) => ({
    ...state,
    movies: MovieData,
  })),

  on(MovieApiActions.addMoviesSuccess, (state, { movie }) => {
    // dodaje sie do store film
    const createNewArr = [...state.movies, movie];

    return { ...state, movies: createNewArr };
  })
);
