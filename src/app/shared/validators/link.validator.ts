import { AbstractControl, ValidationErrors } from '@angular/forms';

export const linkPatternValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const linkPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  const link = control.value;
  if (!linkPattern.test(link)) {
    return { invalidLink: true };
  }
  return null;
};
