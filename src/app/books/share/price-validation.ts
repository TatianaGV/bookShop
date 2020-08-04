import { ValidatorFn, AbstractControl } from '@angular/forms';

export function checkingPriceDifference(): ValidatorFn {
  return (priceToControl: AbstractControl) => {
    const fg = priceToControl.parent;
    const priceFromControl = fg?.get('priceFrom');

    return priceFromControl?.value <= priceToControl.value
      ? null : { check : true };
  };
}

// export function checkingDateDifference(): ValidatorFn {
//   return (releaseDateControl: AbstractControl) => {
//     const fg = priceToControl.parent;
//     const priceFromControl = fg?.get('priceFrom');
//
//     return priceFromControl?.value <= priceToControl.value
//       ? null : { check : true };
//   };
// }
