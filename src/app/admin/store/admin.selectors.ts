import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './admin.state';

const selectMoviesState =
  createFeatureSelector<MovieState>('penetratorWStringu');

export const selectMovies = createSelector(
  selectMoviesState,
  (state) => state.movies
);
