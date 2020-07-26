import { Component } from '@angular/core';

import { IDataBooks } from '../../../core/interfaces/books.interface';
import { IBooksResponse } from '../../../core/data/books.data';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { PageEvent } from '@angular/material/paginator';
import { BooksServices } from '../../../core/services/books.service';


@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})

export class BooksTableComponent {

  public displayedColumns: string[] = [
    'id',
    'description',
    'authorId',
    'title',
    'price',
    'genres',
    'writingDate',
    'releaseDate',
    'menu',
  ];

  constructor(
    private _booksService: BooksServices,
  ) { }


  public get allBooks(): IDataBooks[] {
    return this._booksService.allBooks;
  }

  public get metaData(): IMetaData {
    return this._booksService.meta;
  }

  public changeStateInPaginator(event: PageEvent): void {
    const meta: IMetaData = {
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };
    this._booksService.getAllBooks(meta);
  }

}
