import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorsPanelsComponent } from './components/authors-panels/authors-panels.component';
import { AuthorsCreatePageComponent } from './components/authors-create-page/authors-create-page.component';


const routes: Routes = [
  {
    path: '',
    component: AuthorsListComponent,
    children: [
      {
        path: '', redirectTo: '/authors', pathMatch: 'full',
      },
      {
        path: '', component: AuthorsPanelsComponent,
      },
      {
        path: 'create', component: AuthorsCreatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule { }
