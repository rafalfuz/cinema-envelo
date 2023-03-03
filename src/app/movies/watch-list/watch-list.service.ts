import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movies } from 'models';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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
  private toast = inject(ToastrService);
  private authService = inject(AuthService);
  private url = 'http://localhost:3000/watchList';
  private moviesUrl = 'http://localhost:3000/movies';
  currentUser: string | null = '';
  private watchList$$ = new BehaviorSubject<WatchListRecord[]>([]);

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
    return this.http
      .post<WatchListRecord>(this.url, {
        id: new Date().valueOf(),
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
}
