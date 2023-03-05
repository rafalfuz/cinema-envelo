import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Movies } from '../movies.interface';

export interface WatchListRecord {
  id: number;
  idUser: string;
  movie: string;
}

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = 'http://localhost:3000/watchList';
  private moviesUrl = 'http://localhost:3000/movies';
  currentUser: string | null = '';
  private watchList$$ = new BehaviorSubject<WatchListRecord[]>([]);
  private declareToWatchList$$ = new BehaviorSubject<{ hasDeclared: boolean }>({
    hasDeclared: false,
  });

  constructor() {
    this.authService.auth$.subscribe((data) => (this.currentUser = data.id));
    this.fetchWatchList();
  }

  fetchWatchList() {
    return this.http
      .get<WatchListRecord[]>(this.url)
      .subscribe((res) => this.watchList$$.next(res));
  }

  fetchWatchListById(id: string | number) {
    return this.http.get<WatchListRecord>(`${this.url}/${id}`);
  }

  get watchList$() {
    return this.watchList$$.asObservable();
  }

  getMovieRecordByTitle$(title: string) {
    return this.http.get<Movies>(`${this.moviesUrl}/${title}`);
  }

  addMovieToWatchList(title: string) {
    const user = this.currentUser;
    const id = new Date().valueOf();
    return this.http
      .post<WatchListRecord>(this.url, {
        id: id,
        idUser: user,
        movie: title,
      })
      .subscribe(() => {
        return this.fetchWatchList();
      });
  }

  getRecordsByUsersName() {
    return this.authService.selectUserId$.pipe(
      switchMap((id) => {
        return this.http.get<WatchListRecord[]>(`${this.url}?idUser=${id}`);
      })
    );
  }

  getMatchingRecord(title: string) {
    const user = this.currentUser;
    const url = `${this.url}?idUser=${user}&movie=${title}`;
    return this.http.get<WatchListRecord[]>(url);
  }

  findId(title: string) {
    return this.getMatchingRecord(title).pipe(map((items) => items[0].id));
  }

  removeFromWatchList(title: string) {
    this.findId(title)
      .pipe(switchMap((id) => this.http.delete(`${this.url}/${id}`)))
      .subscribe(() => this.fetchWatchList());
  }

  checkExist(title: string) {
    const user = this.currentUser;
    let exist = false;
    this.watchList$
      .pipe(
        map((watchRecord) => {
          return watchRecord
            .filter((record) => record.idUser === user)
            .map((result) => {
              return result.movie === title;
            });
        })
      )
      .subscribe((result) => {
        exist = result.some((result) => result === true);
      });
    return exist;
  }
}
