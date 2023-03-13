import { AsyncPipe, NgFor, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Movies, Reperoire } from 'src/app/movies/movies.interface';
import { Room } from 'src/app/order/order.interface';
import { timeFormatValidator } from 'src/app/shared/validators/time.validator';
import { Record } from '../admin.interface';
import { MovieActions } from '../store/admin.actions';

@Component({
  standalone: true,
  selector: 'app-selected-movie-display',
  templateUrl: './selected-movie-display.component.html',
  styleUrls: ['./selected-movie-display.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    NgForOf,
    MatCardModule,
    NgStyle,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class SelectedMovieDisplayComponent {
  @Input() selected$!: Observable<Reperoire[]>;
  @Input() rooms$!: Observable<Room[]>;
  private formBuilder = inject(NonNullableFormBuilder);
  formToAddToRepertuare = this.formToAddMovieGroup();
  private store = inject(Store);

  private formToAddMovieGroup() {
    return this.formBuilder.group({
      dayOfScreening: this.formBuilder.control('', [Validators.required]),
      startTime: this.formBuilder.control('', [
        Validators.required,
        timeFormatValidator,
      ]),
      room: this.formBuilder.control(
        {
          id: '',
          name: '',
          rows: 0,
          columns: 0,
        },
        [Validators.required]
      ),
    });
  }

  sendFormToRepertuar(record: Record[] | Reperoire[]) {
    this.formToAddToRepertuare.markAllAsTouched();
    if (this.formToAddToRepertuare.invalid) return;
    this.store.dispatch(
      MovieActions.addWizardRecord({
        movie: record[0],
        wizardFormRecord: this.formToAddToRepertuare.getRawValue(),
      })
    );
  }

  getWrongFormatTime(formControlName: 'startTime' | 'dayOfScreening' | 'room') {
    const control = this.formToAddToRepertuare.get(formControlName);

    if (control?.hasError('timeFormatValidator')) {
      return 'Wpisz poprawny format godziny GG:MM';
    }
    if (control?.hasError('required')) {
      return 'Pole jest wymagane';
    }

    return '';
  }
}
