import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movies } from 'src/app/movies/movies.interface';

export const MovieActions = createActionGroup({
  ///   Akcje
  source: 'Movie',
  events: {
    'get movies': emptyProps(),
    'add movie': props<{ movies: Movies }>(),
    'get movie': props<{ movieId: string }>(),
  },
});

export const MovieApiActions = createActionGroup({
  /// To co baza zwaraca

  source: 'Movie API',
  events: {
    'get movies success': props<{ MovieData: Movies[] }>(),
    'get movies failure': emptyProps(),

    'add movies success': props<{ movie: Movies }>(),
    'add movies failure': emptyProps(),

    'get movie success': props<{ MovieData: Movies }>(),
    'get movie failure': emptyProps(),
  },
});
