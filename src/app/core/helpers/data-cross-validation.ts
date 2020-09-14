import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const dataCrossValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const writingDateControl = control.get('writingDate');
  const releaseDateControl = control.get('releaseDate');

  const checkDate = writingDateControl.value < releaseDateControl.value;
  if (checkDate) {
    writingDateControl.setErrors({ dataCheck: true });
    releaseDateControl.setErrors({ dataCheck: true });
  }

  return checkDate ? { dataCheck: true } : null;
};

