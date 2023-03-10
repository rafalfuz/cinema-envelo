import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TicketsApiService } from './tickets.api.service';
import { TicketInfo } from '../order.interface';

describe('GuestApiService', () => {
  let service: TicketsApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketsApiService],
    });
    service = TestBed.inject(TicketsApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should fetch tickets', (done) => {
    const dummyTicket: TicketInfo[] = [
      {
        type: 'normalny',
        price: 20,
      },
      {
        type: 'ulgowy',
        price: 12,
      },
      {
        type: 'rodzinny',
        price: 16,
      },
    ];

    service.fetchTickets().subscribe({
      next: (res) => {
        expect(res).toEqual(dummyTicket);
        done();
      },
    });

    const req = httpController.expectOne('http://localhost:3000/ticketInfo');
    req.flush(dummyTicket);
  });
});
