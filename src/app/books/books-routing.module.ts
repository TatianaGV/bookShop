import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksPageComponent } from './components/books-page/books-page.component';
import { BooksCreatePageComponent } from './components/books-create-page/books-create-page.component';
import { BooksPanelsComponent } from './components/books-panels/books-panels.component';
import { BooksEditPageComponent } from './components/books-edit-page/books-edit-page.component';


const routes: Routes = [
  {
    path: '',
    component: BooksPageComponent,
    children: [
      {
        path: '', component: BooksPanelsComponent,
      },
      {
        path: 'create', component: BooksCreatePageComponent,
      },
      {
        path: ':id', component: BooksEditPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule { }
