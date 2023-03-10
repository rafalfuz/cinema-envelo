import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { whitespaceValidator } from 'src/app/shared/validators/whitespace.validator';
import { User } from '../auth.interface';
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
  userdata!: User;

  private createForm() {
    return this.builder.group({
      email: this.builder.control('', [
        whitespaceValidator,
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: this.builder.control('', [
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

  getLoginErrorMessage(formControlName: 'email' | 'password') {
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

  proceedLogin() {
    console.log(this.form.getRawValue().email);
    if (this.form.invalid) {
      return;
    }

    this.authService
      .getUserDataById(this.form.getRawValue().email)
      .subscribe((res) => {
        this.userdata = res;
        if (this.userdata.password === this.form.value.password) {
          localStorage.setItem('userId', this.userdata.id!);
          localStorage.setItem('userName', this.userdata.name!);
          localStorage.setItem('userRole', this.userdata.role!);
          this.authService.login(this.userdata);
          this.toast.success(`Zostałes zalogowany jako ${this.userdata.name}`);
        } else {
          this.toast.error('Błędne hasło. Spróbuj ponowanie');
        }
      });
  }
}
