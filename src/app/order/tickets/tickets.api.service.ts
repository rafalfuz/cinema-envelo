import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketInfo } from '../order.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketsApiService {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/ticketInfo';

  fetchTickets(): Observable<TicketInfo[]> {
    return this.http.get<TicketInfo[]>(`${this.apiUrl}`);
  }
}
