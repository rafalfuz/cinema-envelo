import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, OperatorFunction } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from '../../order.interface';
import { ShowingService } from '../../showing.service';
import { ReservationApiService } from './reservation.api.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservation$$ = new BehaviorSubject<Reservation[]>([]);
  private showing$ = inject(ShowingService).showing$;
  private reservationAPIService = inject(ReservationApiService);
  private authService = inject(AuthService);

  constructor() {
    this.showing$.pipe(map((data) => data.state?.id)).subscribe((id) => {
      this.reservationAPIService
        .fetchReservationsShowingId(id!)
        .subscribe((data) => {
          this.reservation$$.next(data);
        });
    });
  }

  get reservation$() {
    return this.reservation$$.asObservable();
  }
}

//Dopytać sie o ! w loggedUserId
