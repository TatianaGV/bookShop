import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsPanelsComponent } from './view/panel/panels.view';
import { AuthorsCreatePageComponent } from './components/create-page/create-page.component';
import { AuthorsEditPageComponent } from './components/edit-page/edit-page.component';
import { AuthorsResolver } from './resolvers/authors.resolver';


const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule { }
