import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShowingDatas } from 'models';
import { BehaviorSubject, from, of, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowingService {
  private http = inject(HttpClient);
  private showing$$ = new BehaviorSubject<{ state: ShowingDatas | null }>({
    state: null,
  });
  private url = 'http://localhost:3000/showings/';

  constructor() {}

  fetchShowingByShowingId(showingId: string) {
    this.http
      .get<ShowingDatas>(`${this.url}${showingId}?_expand=room&_expand=movie`)
      .subscribe((data) => {
        this.showing$$.next({ state: data });
      });
  }

  get showing$() {
    return this.showing$$.asObservable();
  }
}
