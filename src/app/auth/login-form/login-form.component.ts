import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private builder = inject(NonNullableFormBuilder);
  private toast = inject(ToastrService);

  form = this.createForm();
  userdata: any; // this.authService.userdata$;

  private createForm() {
    return this.builder.group({
      email: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      password: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
        ],
      }),
    });
  }

  get emailCtrl() {
    return this.form.controls.email;
  }

  get passwordCtrl() {
    return this.form.controls.password;
  }

  getEmailSuccessMessage() {
    return 'great!';
  }

  getEmailErrorMessage() {
    if (this.emailCtrl.hasError('required')) {
      return 'To pole jest obowiązkowe';
    }
    return this.emailCtrl.hasError('email') ? 'Nieprawidłowy adres email' : '';
  }

  // value -

  proceedLogin() {
    console.log(this.form.getRawValue().email);
    if (this.form.invalid) {
      return;
    }

    // if (this.form.valid) {
    this.authService
      .getUserDataById(this.form.getRawValue().email)
      .subscribe((res) => {
        this.userdata = res;
        if (this.userdata.password === this.form.value.password) {
          localStorage.setItem('userId', this.userdata.id);
          localStorage.setItem('userName', this.userdata.name);
          localStorage.setItem('userRole', this.userdata.role);
          this.authService.login(this.userdata);
          this.toast.success(`Zostałes zalogowany jako ${this.userdata.name}`);
        } else {
          this.toast.error('Błędne hasło. Spróbuj ponowanie');
        }
      });
    // }
  }
}
