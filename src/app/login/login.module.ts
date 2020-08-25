import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginContainer } from './containers/login';
import { LoginRoutingModule } from './login-routing.module';
import { LoginView } from './views/login';
import { LoginFormComponent } from './components/login-form';

@NgModule({
  declarations: [
    LoginContainer,
    LoginView,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
})
export class LoginModule { }
