import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const dataCrossValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  debugger;
  const writingDateControl = control.get('writingDate');
  const releaseDateControl = control.get('releaseDate');

  if (writingDateControl.value && releaseDateControl.value) {
    const checkDate = new Date(writingDateControl.value) <= new Date(releaseDateControl.value);
    if (!checkDate) {
      writingDateControl.setErrors({ dataCheck: true });
      releaseDateControl.setErrors({ dataCheck: true });
    }

    return !checkDate ? { dataCheck: true } : null;
  }
};

