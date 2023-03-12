import { Movies, Reperoire } from 'src/app/movies/movies.interface';
import { Room } from 'src/app/order/order.interface';

export interface MovieState {
  // repertuare: Reperoire;
  repertuare: Reperoire[];
  movies: Movies[];
  rooms: Room[];
}
export const initialMovieState: MovieState = {
  // repertuare: {
  //   movie: {
  //     id: '',
  //     title: '',
  //     image: '',
  //     descriptionShort: '',
  //     rating: 0,
  //     votesNumber: 0,
  //     premiere: false,
  //     runTime: 0,
  //     pg: 0,
  //     genre: '',
  // day: '',
  //   // hours: [],
  // },
  //   },
  repertuare: [],
  movies: [],
  rooms: [],
};
