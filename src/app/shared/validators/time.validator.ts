import { AbstractControl } from '@angular/forms';

export function timeFormatValidator(control: AbstractControl) {
  const timeRegExp = /^([01]\d|2[0-3]):[0-5]\d$/;
  const isValid = timeRegExp.test(control.value);
  return isValid ? null : { invalidTimeFormat: true };
}
