import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from '../../order.interface';
import { ReservationApiService } from './reservation.api.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservation$$ = new BehaviorSubject<Reservation[]>([]);

  private reservationAPIService = inject(ReservationApiService);
  private authService = inject(AuthService);
  //Dopytać sie o ! w loggedUserId

  constructor() {
    this.authService.auth$
      .pipe(map((data) => data.id))
      .subscribe((loggedUserId) => {
        this.reservationAPIService
          .fetchReservationsByUser(loggedUserId!)
          .subscribe((data) => {
            this.reservation$$.next(data);
          });
      });
  }

  get reservation$() {
    return this.reservation$$.asObservable();
  }
}
