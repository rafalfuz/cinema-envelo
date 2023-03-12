import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movies, Reperoire } from 'src/app/movies/movies.interface';
import { Room } from 'src/app/order/order.interface';
import { WizardFormRecord } from '../admin.interface';

export const MovieActions = createActionGroup({
  source: 'Movie',
  events: {
    'get movies': emptyProps(),
    'add movie': props<{ movies: Movies }>(),
    'get repertuare': props<{ movieId: string }>(),
    'get rooms': emptyProps(),
    'add wizard record': props<{
      movie: Reperoire;
      wizardFormRecord: WizardFormRecord;
    }>(),
  },
});

export const MovieApiActions = createActionGroup({
  source: 'Movie API',
  events: {
    'get movies success': props<{ MovieData: Movies[] }>(),
    'get movies failure': emptyProps(),

    'add movies success': props<{ movie: Movies }>(),
    'add movies failure': emptyProps(),

    'get repertuare success': props<{ RepertuareData: Reperoire[] }>(),
    'get repertuare failure': emptyProps(),

    'get rooms success': props<{ RoomData: Room[] }>(),
    'get rooms failure': emptyProps(),

    'add wizard record success': props<{ newRepertuareRecord: Reperoire }>(),
    'add wizard record failure': emptyProps(),
  },
});
