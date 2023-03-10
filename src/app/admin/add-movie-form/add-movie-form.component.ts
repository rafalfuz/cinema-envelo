import { Component, inject } from '@angular/core';
import {
  NgModel,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { MovieActions } from '../store/admin.actions';

@Component({
  standalone: true,
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.css'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class AddMovieFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  formToAddMovie = this.formToAddMovieGroup();

  store = inject(Store);

  private formToAddMovieGroup() {
    return this.formBuilder.group({
      id: this.formBuilder.control('penetratore-2', {
        validators: [],
      }),
      title: this.formBuilder.control('Penetratore 2', {
        validators: [],
      }),
      videoId: this.formBuilder.control('o1eM_zNjJ64', {
        validators: [],
      }),
      image: this.formBuilder.control(
        'https://www.themoviedb.org/t/p/w1280/hfb6sMnCtFoGjguf7GNaMh0FD14.jpg',
        {
          validators: [],
        }
      ),
      descriptionShort: this.formBuilder.control(
        'When mankind rises from the ashes of the nuclear fire, the struggle to overcome the tyranny of the machine and regenerate the human race will rage for decades. But, the final will be fought here; in our present. Tonight!',
        {
          validators: [],
        }
      ),
      rating: this.formBuilder.control(10, {
        validators: [],
      }),
      votesNumber: this.formBuilder.control(11000000, {
        validators: [],
      }),
      premiere: this.formBuilder.control(false, {
        validators: [],
      }),
      runTime: this.formBuilder.control(0, {
        validators: [],
      }),
      pg: this.formBuilder.control(18, {
        validators: [],
      }),
      genre: this.formBuilder.control('Action', {
        validators: [],
      }),
      day: this.formBuilder.control('11-12-2022', {
        validators: [],
      }),
      cast: this.formBuilder.control('Woody Long, Ron Jeremy, Angela Summers', {
        validators: [],
      }),
    });
  }

  onSubmit() {
    this.store.dispatch(
      MovieActions.addMovie({ movies: this.formToAddMovie.getRawValue() })
    );
  }
}
