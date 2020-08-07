import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresCustomControlComponent } from './genres-custom-control/genres-custom-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
  ],
  declarations: [GenresCustomControlComponent],
  exports: [
    GenresCustomControlComponent,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GenresCustomControlComponent),
    multi: true,
  }],
})
export class GenresControlModule { }
