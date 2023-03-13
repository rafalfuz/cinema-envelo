import { Hour, Movie } from '../movies/movies.interface';
import { Room } from '../order/order.interface';

export interface WizardFormRecord {
  dayOfScreening: string;
  startTime: string;
  room: Room;
}

export interface Record {
  id: number | string;
  day: string;
  hours: Hour[];
  movie: Movie;
  room: Room;
}
