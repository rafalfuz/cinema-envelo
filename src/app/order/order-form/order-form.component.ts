import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [ReactiveFormsModule, MatFormFieldModule],
})
export class OrderFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  orderTicketsForm = this.orderTicketsFormGroup();

  private orderTicketsFormGroup() {
    return this.formBuilder.group({
      name: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      surname: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      phoneNumber: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      email: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      emailRepeat: this.formBuilder.control('', {
        validators: [],
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
