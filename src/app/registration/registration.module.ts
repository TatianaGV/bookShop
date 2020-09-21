import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PasswordModule } from '../libs/password/password.module';
import { CreditCardModule } from '../libs/credit-card/credit-card.module';

import { RegistrationContainer } from './containers/registration';
import { RegistrationRoutingModule } from './registration.routing-module';
import { RegistrationService } from './services/registration.service';
import { RegistrationComponent } from './components/registration';
import { StepperComponent } from './view/stepper/stepper.component';
import { AddressComponent } from './components/address';
import { AddressContainer } from './containers/address/address.container';
import { CountryService } from './services/country.service';


@NgModule({
  declarations: [
    RegistrationComponent,
    StepperComponent,
    AddressComponent,
    AddressContainer,
    RegistrationContainer,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    PasswordModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    CreditCardModule,
  ],
  providers: [
    RegistrationService,
    CountryService,
  ],
})
export class RegistrationModule { }
