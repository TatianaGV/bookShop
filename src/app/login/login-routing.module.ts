import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginMainPageComponent } from './login-main-page/login-main-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginMainPageComponent,
    children: [
      {
        path: '',
        component: LoginPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
