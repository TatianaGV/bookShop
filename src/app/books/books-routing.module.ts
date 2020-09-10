import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksPageComponent } from './views/main-page/books-page.component';
import { BooksCreatePageComponent } from './views/create-page/books-create-page.component';
import { BooksPanelsComponent } from './views/panel/books-panels.component';
import { BooksEditPageComponent } from './views/edit-page/books-edit-page.component';


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
