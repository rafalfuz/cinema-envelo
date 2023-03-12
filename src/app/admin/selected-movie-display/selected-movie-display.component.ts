import { AsyncPipe, NgFor, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reperoire } from 'src/app/movies/movies.interface';
import { Room } from 'src/app/order/order.interface';
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
      dayOfScreening: this.formBuilder.control('', {
        validators: [],
      }),
      startTime: this.formBuilder.control('', {
        validators: [],
      }),
      room: this.formBuilder.control(
        {
          id: '',
          name: '',
          rows: 0,
          columns: 0,
        },
        {
          validators: [],
        }
      ),
    });
  }

  selectedRoom(event: any) {
    console.log(event);
  }

  sendFormToRepertuar(record: any) {
    console.log(this.formToAddToRepertuare.getRawValue());
    this.store.dispatch(
      MovieActions.addWizardRecord({
        movie: record[0],
        wizardFormRecord: this.formToAddToRepertuare.getRawValue(),
      })
    );
  }
}
