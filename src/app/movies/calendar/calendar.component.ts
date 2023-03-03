import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { MoviesService } from 'src/app/movies/movies.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  route = inject(Router);
  actRoute = inject(ActivatedRoute);
  movieService = inject(MoviesService);
  firstDayOfRepertuare = '06-12-2022';
  firstDayOfRepertuare$ = this.actRoute.paramMap.pipe(
    map((params) => params.get('date'))
  );
  week$ = this.movieService.week$.pipe(
    map((week) => {
      return {
        week,
      };
    })
  );
}
