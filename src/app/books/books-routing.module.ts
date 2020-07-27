import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksCreatePageComponent } from './components/books-create-page/books-create-page.component';
import { BooksPanelsComponent } from './components/books-panels/books-panels.component';
import { BooksEditPageComponent } from './components/books-edit-page/books-edit-page.component';


const routes: Routes = [
  {
    path: '',
    component: BooksListComponent,
    children: [
      {
        path: '', redirectTo: '/books', pathMatch: 'full',
      },
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
