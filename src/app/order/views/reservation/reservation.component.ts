import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { ShowingService } from '../../showing.service';
import { SeatComponent } from '../../components/seat/seat/seat.component';
import { TakenSeat } from '../../order.interface';

@Component({
  standalone: true,
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, NgFor, SeatComponent],
})
export class ReservationComponent {
  private route = inject(ActivatedRoute);
  showingService = inject(ShowingService);
  rows: string[] = [];
  columns: number[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  takenSeats?: TakenSeat[] = [];
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
      this.takenSeats = result.state?.takenSeats;
    })
  );

  isSeatSold(row: string, column: number): boolean {
    return (
      this.takenSeats?.some(
        (seat) => seat.position.row === row && seat.position.column === column
      ) ?? false
    );
  }

  onSeatClick(row: string, column: number) {
    console.log(row, column);
  }

  ngOnInit() {
    this.showingService.fetchShowingByShowingId(
      this.route.snapshot.params['id']
    );
  }
}
