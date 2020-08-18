import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PersonalAccountComponent } from '../account/personal-account/personal-account.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginMainPageComponent } from './login-main-page/login-main-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginMainPageComponent,
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
  providers: [
    AuthService,
  ],
})
export class LoginModule { }
