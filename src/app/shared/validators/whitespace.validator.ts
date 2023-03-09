import { AbstractControl, ValidatorFn } from '@angular/forms';

export const whiteSpaceValidator: ValidatorFn = (control: AbstractControl) => {
  if (control.value && control.value.trim().length === 0) {
    return { whitespace: true };
  }
  return null;
};
