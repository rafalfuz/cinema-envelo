import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddMovieFormComponent } from './add-movie-form/add-movie-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from './store/admin-movie.service';
import { Store } from '@ngrx/store';
import { selectMovies } from './store/admin.selectors';
import { AsyncPipe, JsonPipe, NgFor, NgForOf } from '@angular/common';
import { MovieActions } from './store/admin.actions';

@Component({
  standalone: true,
  imports: [
    AddMovieFormComponent,
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
})
export class AdminViewComponent {
  public dialog = inject(MatDialog);
  private store = inject(Store);

  movies$ = this.store.select(selectMovies);
  openDialog() {
    this.dialog.open(AddMovieFormComponent);
  }

  ngOnInit() {
    this.store.dispatch(MovieActions.getMovies());
  }
}
