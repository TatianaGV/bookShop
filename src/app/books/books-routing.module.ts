import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksCreatePageComponent } from './views/create-page/books-create-page.view';
import { BooksPanelsComponent } from './views/panel/books-panels.view';
import { BooksEditPageComponent } from './views/edit-page/books-edit-page.view';


const routes: Routes = [
  {
    path: '',
    component: BooksPanelsComponent,
  },
  {
    path: 'create',
    component: BooksCreatePageComponent,
  },
  {
    path: ':id',
    component: BooksEditPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule { }
