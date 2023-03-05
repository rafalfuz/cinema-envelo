import { Movie } from '../movies/movies.interface';

export interface Room {
  id: number;
  name: string;
  rows: number;
  columns: number;
}

export interface TicketInfo {
  type: string;
  price: number;
}

export interface Position {
  row: string;
  column: string;
}

export interface TakenSeat {
  position: Position;
  isBusy: boolean;
}

export interface Showing {
  id: string;
  roomId: string;
  movieId: string;
  takenSeats: TakenSeat[];
}

export interface Cinemarooms {
  id: string;
  seats: {
    position: { row: string; column: string };
    isBusy: boolean;
    status: boolean;
  };
}

export interface ShowingDatas {
  id: string;
  roomId: string;
  movieId: string;
  time: string;
  day: string;
  takenSeats: TakenSeat[];
  room: {
    id: string;
    name: string;
    rows: string;
    columns: string;
  };
  movie: Movie;
}
