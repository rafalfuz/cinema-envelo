import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.css'],
})
export class ListOfMoviesComponent {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  private movieService = inject(MoviesService);
  private actRoute = inject(ActivatedRoute);

  movies$ = this.movieService.movies$;
  today = inject(MoviesService).getToday();

  ngOnInit() {
    this.actRoute.params.subscribe((params) => {
      this.movieService.getMoviesByDay(params['date']);
    });
    // this.movies$.subscribe((data) => console.log(data));
  }
}
