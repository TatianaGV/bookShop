import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginView } from './views/login';

const routes: Routes = [
  {
    path: '',
    component: LoginView,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
