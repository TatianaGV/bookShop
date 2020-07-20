import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksCreateItemComponent } from './components/books-create-item/books-create-item.component';
import { BooksPanelsComponent } from './components/books-panels/books-panels.component';


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
        path: 'create', component: BooksCreateItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule { }
