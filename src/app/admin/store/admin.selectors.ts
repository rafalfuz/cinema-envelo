import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './admin.state';

const selectMoviesState =
  createFeatureSelector<MovieState>('penetratorWStringu'); // sluzy do dobierania sie do kawalka stanu

export const selectMovies = createSelector(
  selectMoviesState,
  (state) => state.movies
);

export const selectRepertuareRecord = createSelector(
  selectMoviesState,
  (state) => state.repertuare
);

export const selectRooms = createSelector(
  selectMoviesState,
  (state) => state.rooms
);
