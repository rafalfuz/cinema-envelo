import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddMovieFormComponent } from './add-movie-form/add-movie-form.component';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import {
  selectDay,
  selectMovies,
  selectRepertuareRecord,
  selectRooms,
} from './store/admin.selectors';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { MovieActions, MovieApiActions } from './store/admin.actions';
import { SelectedMovieDisplayComponent } from './selected-movie-display/selected-movie-display.component';

@Component({
  standalone: true,
  imports: [
    AddMovieFormComponent,
    SelectedMovieDisplayComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    JsonPipe,
    AsyncPipe,
    NgForOf,
  ],
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['admin-view.component.css'],
})
export class AdminViewComponent {
  public dialog = inject(MatDialog);
  private store = inject(Store);

  movies$ = this.store.select(selectMovies);
  repertuare$ = this.store.select(selectRepertuareRecord);
  rooms$ = this.store.select(selectRooms);
  week$ = this.store.select(selectDay);

  openDialog() {
    this.dialog.open(AddMovieFormComponent);
  }

  ngOnInit() {
    this.store.dispatch(MovieActions.getMovies());
    this.store.dispatch(MovieActions.getRooms());
    this.store.dispatch(MovieActions.getWeek());
    console.log(this.week$.subscribe((data) => console.log('init', data)));
  }

  selectedMovie(id: string) {
    this.store.dispatch(MovieActions.getRepertuare({ movieId: id }));
  }
}
