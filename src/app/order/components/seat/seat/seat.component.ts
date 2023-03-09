import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { ReservationService } from 'src/app/order/views/reservation/reservation.service';

@Component({
  standalone: true,
  selector: 'app-seat[row][column]',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgIf, AsyncPipe],
})
export class SeatComponent {
  @Input() row!: string;
  @Input() column!: number;
  @Input() isSold?: boolean;

  @Output() seatClick = new EventEmitter();

  reservation$ = inject(ReservationService).reservation$;
  isSeatSelected$: Observable<{ isSeatSelected: boolean }> = EMPTY;

  handleSeat() {
    this.seatClick.emit();
  }

  isSeatSelected(
    row: string,
    column: number
  ): Observable<{ isSeatSelected: boolean }> {
    return this.reservation$.pipe(
      map((data) => {
        const isSeatSelected = data.some(
          (element) => element.row === row && element.column === column
        );
        return {
          isSeatSelected,
        };
      })
    );
  }

  ngOnInit() {
    this.isSeatSelected$ = this.isSeatSelected(this.row, this.column);
  }
}
