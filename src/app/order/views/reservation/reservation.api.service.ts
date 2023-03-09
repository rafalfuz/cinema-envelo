import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reservation } from '../../order.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationApiService {
  private http = inject(HttpClient);

  private url = 'http://localhost:3000/selectedSeats/';

  constructor() {}

  fetchReservationsByUser(user: string) {
    return this.http.get<Reservation[]>(`${this.url}?user=${user}`);
  }

  fetchReservationsShowingId(showingId: string) {
    return this.http.get<Reservation[]>(`${this.url}?showingId=${showingId}`);
  }

  addToReservation(
    showingId: string,
    row: string,
    column: number,
    user: string | null
  ) {
    return this.http
      .post<Reservation>(`${this.url}`, {
        id: new Date(),
        showingId,
        row,
        column,
        user,
      })
      .subscribe(() => {
        return this.fetchReservationsShowingId(showingId);
      });
  }
}
