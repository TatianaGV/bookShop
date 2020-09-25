import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/components/layout/layout.component';
import { MainPageComponent } from './layout/components/main-page/main-page.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: MainPageComponent },
      {
        path: 'authors',
        loadChildren: () => import('./authors/authors.module')
          .then((m) => m.AuthorsModule),
      },
      { path: 'books',
        loadChildren: () => import('./books/books.module')
          .then((m) => m.BooksModule),
      },
      {
        path: 'table',
        loadChildren: () => import('./table/table.module')
          .then((m) => m.TableModule),
      },
      { path: 'login',
        loadChildren: () => import('./login/login.module')
          .then((m) => m.LoginModule),
      },
      { path: 'registration',
        loadChildren: () => import('./registration/registration.module')
          .then((m) => m.RegistrationModule),
      },
      { path: 'account',
        loadChildren: () => import('./account/account.module')
          .then((m) => m.AccountModule),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module')
      .then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
