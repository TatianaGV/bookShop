import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AuthService } from '../login/services/auth.service';

@NgModule({
  declarations: [
    PersonalAccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
  ],
})
export class AccountModule { }
