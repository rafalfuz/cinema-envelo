import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies, Reperoire } from 'models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private url = 'http://localhost:3000';
  private movies$$ = new BehaviorSubject<Reperoire[] | []>([]);
  private moviesBank$$ = new BehaviorSubject<Movies[]>([]);
  private week$$ = new BehaviorSubject<string[]>([
    '06-12-2022',
    '07-12-2022',
    '08-12-2022',
    '09-12-2022',
    '10-12-2022',
    '11-12-2022',
    '12-12-2022',
  ]);

  constructor(private http: HttpClient) {
    this.getMovies().subscribe((res) => {
      this.moviesBank$$.next(res);
    });
  }

  get week$() {
    return this.week$$.asObservable();
  }

  get movies$() {
    return this.movies$$.asObservable();
  }

  get moviesBank$() {
    return this.moviesBank$$.asObservable();
  }

  getToday() {
    let today = '';
    this.week$$.subscribe((data) => {
      today = data[0];
    });
    return today;
  }

  private getMovies() {
    return this.http.get<[Movies]>(this.url + '/movies');
  }

  getRepertoire(): Observable<Reperoire[]> {
    return this.http.get<Reperoire[]>(this.url + '/reperoire');
  }

  getMoviesByDay(day: string) {
    this.http.get<Reperoire[]>(`${this.url}/reperoire?day=${day}`).subscribe({
      next: (result) => this.movies$$.next(result),
    });
  }

  getMovieRecordByTitle(title: string) {
    return this.http.get(`${this.url}/movies/${title}`);
  }

  getDate(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/week');
  }
}
