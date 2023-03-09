import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TicketInfo } from '../order.interface';
import { TicketsApiService } from './tickets.api.service';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  ticketApiServer = inject(TicketsApiService);

  private ticketState$$ = new BehaviorSubject<TicketInfo[] | null>([]);

  constructor() {
    this.ticketApiServer.fetchTickets().subscribe((res) => {
      this.ticketState$$.next(res);
    });
  }

  get ticketDetails$() {
    return this.ticketState$$.asObservable();
  }
}
