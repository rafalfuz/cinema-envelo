import { Movies, Reperoire } from 'src/app/movies/movies.interface';
import { Room } from 'src/app/order/order.interface';

export interface MovieState {
  repertuare: Reperoire[];
  movies: Movies[];
  rooms: Room[];
  week: [string];
}
export const initialMovieState: MovieState = {
  repertuare: [],
  movies: [],
  rooms: [],
  week: [''],
};
