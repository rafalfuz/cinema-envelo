import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import patterns from 'src/app/shared/validators/paterns';

@Component({
  standalone: true,
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class OrderFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  orderTicketsForm = this.orderTicketsFormGroup();

  private orderTicketsFormGroup() {
    return this.formBuilder.group({
      name: this.formBuilder.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(patterns.nosigns),
        ],
      }),
      surname: this.formBuilder.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(patterns.nosigns),
        ],
      }),
      phoneNumber: this.formBuilder.control('', {
        validators: [
          Validators.minLength(9),
          Validators.maxLength(30),
          Validators.pattern(patterns.phone),
        ],
      }),
      email: this.formBuilder.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(patterns.email),
        ],
      }),
      emailRepeat: this.formBuilder.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(patterns.email),
        ],
      }),
      newsletterToggler: this.formBuilder.control(false, {
        validators: [],
      }),
      promo: this.formBuilder.control('', {
        validators: [],
      }),
    });
  }

  get nameCtrl() {
    return this.orderTicketsForm.controls.name;
  }

  getNameErrorMessage() {
    this.nameCtrl.hasError('required');
    return 'To pole jest wymagane';
  }

  get surNameCtrl() {
    return this.orderTicketsForm.controls.surname;
  }

  getSurNameErrorMessage() {
    this.nameCtrl.hasError('required');
    return 'To pole jest wymagane';
  }

  get phoneNumberCtrl() {
    return this.orderTicketsForm.controls.phoneNumber;
  }

  getPhoneNumberErrorMessage() {
    this.phoneNumberCtrl.hasError('required');
    return 'To pole jest wymagane';
  }

  get emailCtrl() {
    return this.orderTicketsForm.controls.email;
  }

  getEmailErrorMessage() {
    this.emailCtrl.hasError('required');
    return 'To pole jest wymagane';
  }

  get emailRepeatCtrl() {
    return this.orderTicketsForm.controls.emailRepeat;
  }

  getEmailRepeatErrorMessage() {
    this.emailRepeatCtrl.hasError('required');
    return 'To pole jest wymagane';
  }

  get promoCtrl() {
    return this.orderTicketsForm.controls.emailRepeat;
  }

  getPromoCtrlErrorMessage() {
    this.emailRepeatCtrl.hasError('required');
    return 'To pole jest wymagane';
  }
}
