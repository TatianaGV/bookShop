import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const priceCrossValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const priceToControl = control.get('to');
  const priceFromControl = control.get('from');

  if (priceFromControl.value && priceToControl.value) {
    const checkControls = priceToControl.value > priceFromControl.value;
    if (!checkControls) {
      priceFromControl.setErrors({ priceCheck: true });
      priceToControl.setErrors({ priceCheck: true });
    }

    return !checkControls ? { priceCheck: true } : null;
  }
};

