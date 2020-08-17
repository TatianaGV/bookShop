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
      { path: 'login',
        loadChildren: () => import('./profile/profile.module')
          .then((m) => m.ProfileModule),
      },
      { path: 'registration',
        loadChildren: () => import('./registration/registration.module')
          .then((m) => m.RegistrationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
