import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { PasswordModule } from '../libs/password/password.module';

import { RegistrationContainer } from './containers/registration/registration.container';
import { RegistrationRoutingModule } from './registration.routing-module';
import { RegistrationService } from './services/registration.service';
import { RegistrationFormComponent } from './components/registration-form';


@NgModule({
  declarations: [
    RegistrationContainer,
    RegistrationFormComponent,
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
  ],
  providers: [
    RegistrationService,
  ],
})
export class RegistrationModule { }
