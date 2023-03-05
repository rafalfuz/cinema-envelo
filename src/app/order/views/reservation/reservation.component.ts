import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs';
import { ShowingService } from '../../showing.service';

@Component({
  standalone: true,
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, NgFor],
})
export class ReservationComponent {
  private route = inject(ActivatedRoute);
  showingService = inject(ShowingService);
  columns: number[] = [];
  rows: number[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPRSTUWZ'.split('');
  data$ = this.showingService.showing$.pipe(
    tap((result) => {
      this.columns = Array.from(Array(result.state?.room.columns).keys());
      this.rows = Array.from(Array(result.state?.room.rows).keys());
    })
  );

  ngOnInit() {
    this.showingService.fetchShowingByShowingId(
      this.route.snapshot.params['id']
    );
  }
}
