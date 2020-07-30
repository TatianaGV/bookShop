import { FormGroup } from '@angular/forms';

export function checkingPriceDifference(fg: FormGroup): {} | null {
  return fg.get('priceFrom').value <= fg.get('priceTo').value
    ? null : { check : true };
}
