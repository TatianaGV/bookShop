import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PersonalAccountComponent } from './personal-account/personal-account.component';

import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PersonalAccountComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
