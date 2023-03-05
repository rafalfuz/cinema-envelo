export interface WatchListRecord {
  id: number;
  idUser: string;
  movie: string;
}

export interface Reportaire {
  movieId: string;
  hours: string[];
  day: string;
}

export interface Movies {
  id: string;
  title: string;
  videoId: string;
  image: string;
  descriptionShort: string;
  rating: number;
  votesNumber: string;
  premiere: boolean;
  runTime: number;
  pg: number;
  genre: string;
  day: string;
  cast: string;
}

export interface Movie {
  id: string;
  title: string;
  image: string;
  descriptionShort: string;
  rating: number;
  votesNumber: number;
  premiere: boolean;
  runTime: number;
  pg: number;
  genre: string;
}

export interface Reperoire {
  movie: Movie;
  day: string;
  hours: Hour[];
}

export interface Hour {
  time: string;
  roomId: string;
  showingId: string;
}
