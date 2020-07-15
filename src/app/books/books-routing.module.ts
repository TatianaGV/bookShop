import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksListComponent } from './components/books-list/books-list.component';


const routes: Routes = [
  {
    path: '',
    component: BooksListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule { }
