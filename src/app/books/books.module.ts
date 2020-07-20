import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksPanelsComponent } from './components/books-panels/books-panels.component';
import { BooksTableComponent } from './components/books-table/books-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { BooksFilterComponent } from './components/books-filter/books-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksCreatePageComponent } from './components/books-create-page/books-create-page.component';


@NgModule({
  declarations: [
    BooksListComponent,
    BooksPanelsComponent,
    BooksTableComponent,
    BooksFilterComponent,
    BooksCreatePageComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    ReactiveFormsModule,
  ],
})
export class BooksModule { }
