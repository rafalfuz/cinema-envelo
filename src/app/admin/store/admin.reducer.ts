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
  }),

  on(MovieApiActions.getRepertuareSuccess, (state, { RepertuareData }) => ({
    ...state,
    repertuare: RepertuareData,
  })),

  on(MovieApiActions.getRoomsSuccess, (state, { RoomData }) => ({
    ...state,
    rooms: RoomData,
  })),

  on(MovieApiActions.addWizardRecordSuccess, (state, {}) => ({
    ...state,
  }))
);
