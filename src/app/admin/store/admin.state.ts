import { Movies, Reperoire } from 'src/app/movies/movies.interface';
import { Room } from 'src/app/order/order.interface';

export interface MovieState {
  repertuare: Reperoire[];
  movies: Movies[];
  rooms: Room[];
}
export const initialMovieState: MovieState = {
  repertuare: [],
  movies: [],
  rooms: [],
};
