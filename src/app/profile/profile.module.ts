import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PersonalAccountComponent } from './personal-account/personal-account.component';

@NgModule({
  declarations: [
    AuthPageComponent,
    PersonalAccountComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
})
export class ProfileModule { }
