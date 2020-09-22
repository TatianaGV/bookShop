import { ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

import { getDaysInMonth } from 'date-fns';

export const dataCardValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  const valid = control?.value;
  if (valid && valid.length === 4) {
    const month = valid.substr(0, 2);
    const year = '20' + valid.substr(2);

    const days = getDaysInMonth(new Date(+year, month - 1));
    const date = new Date(+year, month - 1, days);
    const check = date > new Date(Date.now());

    return !check ? { validCheck: true } : null;
  }
};
