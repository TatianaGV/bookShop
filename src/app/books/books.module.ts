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


@NgModule({
  declarations: [
    BooksListComponent,
    BooksPanelsComponent,
    BooksTableComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
  ],
})
export class BooksModule { }
