import { Component, inject } from '@angular/core';
import {
  NgModel,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovieService } from '../store/admin-movie.service';

@Component({
  standalone: true,
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.css'],
  imports: [ReactiveFormsModule, MatFormFieldModule],
})
export class AddMovieFormComponent {
  private movieService = inject(MovieService);

  private formBuilder = inject(NonNullableFormBuilder);
  formToAddMovie = this.formToAddMovieGroup();

  private formToAddMovieGroup() {
    return this.formBuilder.group({
      id: this.formBuilder.control('', {
        validators: [],
      }),
      title: this.formBuilder.control('', {
        validators: [],
      }),
      videoId: this.formBuilder.control('', {
        validators: [],
      }),
      image: this.formBuilder.control('', {
        validators: [],
      }),
      descriptionShort: this.formBuilder.control('', {
        validators: [],
      }),
      rating: this.formBuilder.control('', {
        validators: [],
      }),
      votesNumber: this.formBuilder.control('', {
        validators: [],
      }),
      premiere: this.formBuilder.control('', {
        validators: [],
      }),
      runTime: this.formBuilder.control('', {
        validators: [],
      }),
      pg: this.formBuilder.control('', {
        validators: [],
      }),
      genre: this.formBuilder.control('', {
        validators: [],
      }),
      day: this.formBuilder.control('', {
        validators: [],
      }),
      cast: this.formBuilder.control('', {
        validators: [],
      }),
    });
  }

  onSubmit() {
    //
  }
}
