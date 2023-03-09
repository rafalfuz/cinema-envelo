import { AsyncPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ShowingService } from '../../showing.service';
import { SeatComponent } from '../../components/seat/seat/seat.component';
import { Seat } from '../../order.interface';
import { ReservationService } from './reservation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ReservationApiService } from './reservation.api.service';
import { TicketsService } from '../../tickets/tickets.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
    NgFor,
    SeatComponent,
    MatFormFieldModule,
    MatSelectModule,
    NgForOf,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [ReservationService, ShowingService],
})
export class ReservationComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  showingService = inject(ShowingService);
  reservation$ = inject(ReservationService).reservation$;
  reservationAPiService = inject(ReservationApiService);
  ticketDetails$ = inject(TicketsService).ticketDetails$;
  rows: string[] = [];
  columns: number[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  soldSeats?: Seat[] = [];
  selectedSeats?: Seat[] = [];
  currentUserId: string | null = 'guest';

  currentUser = inject(AuthService)
    .auth$.pipe(tap((user) => (this.currentUserId = user.id)))
    .subscribe();

  data$ = this.showingService.showing$.pipe(
    tap((result) => {
      this.rows = Array.from(Array(result.state?.room.rows).keys()).map(
        (index) => {
          return this.alphabet[index];
        }
      );
      this.columns = Array.from(Array(result.state?.room.columns).keys()).map(
        (result) => result + 1
      );
      this.soldSeats = result.state?.soldSeats;
    })
  );

  isSeatSold(row: string, column: number): boolean {
    return (
      this.soldSeats?.some(
        (seat) => seat.position.row === row && seat.position.column === column
      ) ?? false
    );
  }

  onSeatClick(row: string, column: number) {
    this.reservationAPiService.addToReservation(
      this.route.snapshot.params['id'],
      row,
      column,
      this.currentUserId
    );
  }

  ngOnInit() {
    this.showingService.fetchShowingByShowingId(
      this.route.snapshot.params['id']
    );
  }

  navigateToOrderForm() {
    this.router.navigate(['reservation/order']);
  }
}
