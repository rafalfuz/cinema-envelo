import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class SeatComponent {
  @Input() row: string = '';
  @Input() column: number = 0;
  @Input() isSold: boolean = false;
  @Input() isChosen: boolean = false;
  @Output() seatClick = new EventEmitter<{ row: string }>();

  handleSeat() {
    this.seatClick.emit();
  }
}
