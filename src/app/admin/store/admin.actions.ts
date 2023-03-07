import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movies } from 'src/app/movies/movies.interface';

export const MovieActions = createActionGroup({
  source: 'Movie',
  events: {
    'get movies': emptyProps(),
    'update movies': props<{ movieId: string; updateData: Partial<Movies> }>(),
    'get movie': props<{ movieId: string }>(),
  },
});

export const MovieApiActions = createActionGroup({
  source: 'Movie API',
  events: {
    'get movies success': props<{ MovieData: Movies[] }>(),
    'get movies failure': emptyProps(),

    'update movies success': emptyProps(),
    'update movies failure': emptyProps(),

    'get movie success': props<{ MovieData: Movies }>(),
    'get movie failure': emptyProps(), //// zeby sie Kamil nie przypierdolil
  },
});
