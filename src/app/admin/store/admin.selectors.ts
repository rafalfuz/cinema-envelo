import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './admin.state';

const selectMoviesState =
  createFeatureSelector<MovieState>('penetratorWStringu'); // sluzy do dobierania sie do kawalka stanu

export const selectMovies = createSelector(
  selectMoviesState,
  (state) => state.movies
);
