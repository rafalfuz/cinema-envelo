import { ToastrService } from 'ngx-toastr';
import { whitespaceValidator } from 'src/app/shared/validators/whitespace.validator';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf],
})
export class OrderFormComponent {
  private builder = inject(NonNullableFormBuilder);
  private toast = inject(ToastrService);
  form = this.createForm();

  private createForm() {
    return this.builder.group({
      name: this.builder.control('', [
        whitespaceValidator,
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      surname: this.builder.control('', [
        whitespaceValidator,
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      phoneNumber: this.builder.control('', [
        whitespaceValidator,
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      email: this.builder.control('', [
        whitespaceValidator,
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      emailRepeat: this.builder.control('', [
        whitespaceValidator,
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      newsletterToggler: this.builder.control('', [
        whitespaceValidator,
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      promo: this.builder.control('', [
        whitespaceValidator,
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
    });
  }

  getEmailSuccessMessage() {
    return 'great!';
  }

  getOrderErrorMessage(
    formControlName:
      | 'name'
      | 'surname'
      | 'phoneNumber'
      | 'email'
      | 'emailRepeat'
      | 'newsletterToggler'
      | 'promo'
  ) {
    const control = this.form.get(formControlName);

    if (control?.hasError('required')) {
      return 'To pole jest obowiązkowe';
    }

    if (control?.hasError('pattern')) {
      return 'Pole zawiera niepoprawne znaki';
    }

    if (control?.hasError('whitespace')) {
      return 'Pole nie moze zawierac spacji';
    }

    if (control?.hasError('minLenght')) {
      return 'Pole musi zawierac conajmniej 4 znaki';
    }

    if (control?.hasError('maxLenght')) {
      return 'Pole nie może zawierać wiecej niż 25 znaków';
    }

    return '';
  }
}
