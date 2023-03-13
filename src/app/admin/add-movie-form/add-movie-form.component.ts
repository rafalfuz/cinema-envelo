import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { linkPatternValidator } from 'src/app/shared/validators/link.validator';
import { whitespaceValidator } from 'src/app/shared/validators/whitespace.validator';
import { MovieActions } from '../store/admin.actions';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  standalone: true,
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatCheckboxModule,
  ],
})
export class AddMovieFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  formToAddMovie = this.formToAddMovieGroup();
  newId = new Date().valueOf().toString();
  store = inject(Store);

  private formToAddMovieGroup() {
    return this.formBuilder.group({
      id: this.formBuilder.control('', [Validators.required]),
      title: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      videoId: this.formBuilder.control('', [
        Validators.required,
        whitespaceValidator,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      image: this.formBuilder.control('', [
        linkPatternValidator,
        Validators.required,
      ]),
      descriptionShort: this.formBuilder.control('', [
        Validators.minLength(10),
        Validators.maxLength(500),
        Validators.required,
      ]),
      rating: this.formBuilder.control({ value: 0, disabled: true }, []),
      votesNumber: this.formBuilder.control({ value: 0, disabled: true }, []),
      premiere: this.formBuilder.control(false, []),
      runTime: this.formBuilder.control(0, [Validators.required]),
      pg: this.formBuilder.control(0, [Validators.required]),
      genre: this.formBuilder.control('', [Validators.required]),
      day: this.formBuilder.control('', [Validators.required]),
      cast: this.formBuilder.control('', []),
    });
  }

  onSubmit() {
    this.formToAddMovie.markAllAsTouched();
    if (this.formToAddMovie.invalid) return;
    this.store.dispatch(
      MovieActions.addMovie({ movies: this.formToAddMovie.getRawValue() })
    );
  }

  getAddMovieErrorControlMessage(
    formControlName:
      | 'id'
      | 'title'
      | 'videoId'
      | 'image'
      | 'descriptionShort'
      | 'premiere'
      | 'runTime'
      | 'pg'
      | 'genre'
      | 'day'
      | 'cast'
  ) {
    const control = this.formToAddMovie.get(formControlName);

    if (control?.hasError('required')) {
      return 'Pole jest wymagane';
    }

    if (control?.hasError('whitespaceValidator')) {
      return 'Usuń białe znaki';
    }
    if (control?.hasError('minLength')) {
      return 'Pole wymaga wiecej znaków';
    }
    if (control?.hasError('maxLenght')) {
      return 'Za dużo znaków';
    }
    if (control?.hasError('linkPatternValidator')) {
      return 'W tym polu musi zostać umieszczony link';
    }

    return '';
  }
}
