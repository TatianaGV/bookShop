import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const dataCrossValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  return  false ? { dataCheck: true } : null;
};

