import { Movies } from 'src/app/movies/movies.interface';

export interface MovieState {
  movie: Movies;
  movies: Movies[];
}
export const initialMovieState: MovieState = {
  movie: {
    id: '',
    title: '',
    videoId: '',
    image: '',
    descriptionShort: '',
    rating: 0,
    votesNumber: 0,
    premiere: false,
    runTime: 181,
    pg: 13,
    genre: '',
    day: '',
    cast: '',
  },
  movies: [],
};
