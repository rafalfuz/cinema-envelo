import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-selected-movie-display',
  templateUrl: './selected-movie-display.component.html',
  styleUrls: ['./selected-movie-display.component.css'],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class SelectedMovieDisplayComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  formToAddToRepertuare = this.formToAddMovieGroup();
  private formToAddMovieGroup() {
    return this.formBuilder.group({
      dayOfScreening: this.formBuilder.control('', {
        validators: [],
      }),
      startTime: this.formBuilder.control('', {
        validators: [],
      }),
      room: this.formBuilder.control('', {
        validators: [],
      }),
    });
  }

  addScreening() {
    console.log('Wyslij');
  }
}
