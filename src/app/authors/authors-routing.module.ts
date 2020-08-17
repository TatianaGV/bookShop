import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorsPanelsComponent } from './components/authors-panels/authors-panels.component';
import { AuthorsCreatePageComponent } from './components/authors-create-page/authors-create-page.component';
import { AuthorsEditPageComponent } from './components/authors-edit-page/authors-edit-page.component';
import { AuthorsResolver } from './resolvers/authors.resolver';


const routes: Routes = [
  {
    path: '',
    component: AuthorsListComponent,
    children: [
      {
        path: '',
        component: AuthorsPanelsComponent,
        resolve: {
          author: AuthorsResolver,
        },
      },
      {
        path: 'create',
        component: AuthorsCreatePageComponent,
      },
      {
        path: ':id',
        component: AuthorsEditPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule { }
