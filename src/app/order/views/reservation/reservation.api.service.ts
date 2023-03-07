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

  addToReservation(
    showingId: string,
    row: string,
    column: number,
    user: string
  ) {
    return this.http.post<Reservation>(`${this.url}`, {
      id: new Date(),
      showingId,
      row,
      column,
      user,
    });
  }
}
