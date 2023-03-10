import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../../movies/movies.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  fetchMovies() {
    return this.http.get<Movies[]>(`${this.url}`);
  }

  addMovie(movie: Movies) {
    return this.http.post<Movies>(`${this.url}`, movie);
  }
}
