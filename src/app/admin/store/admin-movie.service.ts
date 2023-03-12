import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, Reperoire } from '../../movies/movies.interface';
import {
  Room,
  ShowingDatas,
  ShowingRecord,
} from 'src/app/order/order.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  fetchMovies() {
    return this.http.get<Movies[]>(`${this.url}/movies`);
  }

  fetchReperoire() {
    return this.http.get<Reperoire[]>(`${this.url}/reperoire`);
  }

  addMovie(movie: Movies) {
    return this.http.post<Movies>(`${this.url}/movies`, movie);
  }

  fetchRooms() {
    return this.http.get<Room[]>(`${this.url}/rooms`);
  }

  addToShowingRecord(showingRecord: ShowingRecord) {
    return this.http.post<ShowingRecord>(`${this.url}/showings`, showingRecord);
  }

  addToReperoireRecord(reperoireRecord: Partial<Reperoire>) {
    return this.http.post<Reperoire>(`${this.url}/reperoire`, reperoireRecord);
  }
}
