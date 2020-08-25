import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { AuthGuard } from '../core/guards/auth.guard';

import { AccountRoutingModule } from './account-routing.module';
import { PersonalAccountComponent } from './personal-account/personal-account.component';


@NgModule({
  declarations: [
    PersonalAccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatButtonModule,
  ],
  providers: [
    AuthGuard,
  ],
})
export class AccountModule { }
