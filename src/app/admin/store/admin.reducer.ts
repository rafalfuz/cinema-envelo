import { createReducer, on } from '@ngrx/store';
import { MovieApiActions } from './admin.actions';
import { initialMovieState } from './admin.state';

export const MovieReducer = createReducer(
  initialMovieState,
  on(MovieApiActions.getMoviesSuccess, (state, { MovieData }) => ({
    ...state,
    movies: MovieData,
  }))
);
