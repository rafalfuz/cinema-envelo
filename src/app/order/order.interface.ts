import { Movie } from '../movies/movies.interface';

export interface Room {
  id: string;
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
  column: number;
}

export interface Seat {
  position: Position;
  isBusy: boolean;
}

export interface Showing {
  id: string;
  roomId: string;
  movieId: string;
  soldSeats: Seat[];
}

export interface Cinemarooms {
  id: string;
  seats: {
    position: { row: string; column: number };
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
  soldSeats: Seat[];
  room: {
    id: string;
    name: string;
    rows: string;
    columns: string;
  };
  movie: Movie;
}

export interface Reservation {
  id: number;
  showingId: string;
  row: string;
  column: number;
  user: string;
}

export interface ShowingRecord {
  id: string;
  roomId: string;
  movieId: string;
  time: string;
  day: string;
  soldSeats: [];
}
