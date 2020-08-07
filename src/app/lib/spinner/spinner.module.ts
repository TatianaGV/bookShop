import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerDirective } from './spinner.directive';


@NgModule({
  declarations: [
    SpinnerDirective,
  ],
  exports: [
    SpinnerDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class SpinnerModule { }
