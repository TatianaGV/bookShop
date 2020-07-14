import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MainPageComponent } from './layout/components/main-page/main-page.component';
import { AuthorsMainPageComponent } from './authors/component/authors-main-page/authors-main-page.component';
import { BooksMainPageComponent } from './books/component/books-main-page/books-main-page.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: MainPageComponent },
      { path: 'authors', component: AuthorsMainPageComponent },
      { path: 'books', component: BooksMainPageComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
