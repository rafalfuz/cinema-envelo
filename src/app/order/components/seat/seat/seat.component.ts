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
  @Input() row?: string;
  @Input() column?: number;
  @Input() isSold?: boolean;
  @Input() isSelected?: boolean;
  @Output() seatClick = new EventEmitter();

  handleSeat() {
    this.seatClick.emit();
  }
}
