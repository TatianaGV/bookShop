import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AuthPageComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class ProfileModule { }
