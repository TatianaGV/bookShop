import { Component, OnInit, Input } from '@angular/core';

import { IDataBooks } from '../../../core/interfaces/books.interface';
import { BooksDataServices, IBooksResponse } from '../../../core/data/books.data';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})

export class BooksTableComponent implements OnInit {

  public meta: IMetaData;

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

  public dataSource: IDataBooks[] = [];

  constructor(private _booksService: BooksDataServices) { }

  public ngOnInit(): void {
    this.getAllBooks();
  }

  public getAllBooks(): void {
    this._booksService
      .getAllBooks(this.meta)
      .subscribe((response: IBooksResponse) => {
        this.meta = response.meta;
        this.dataSource = response.books;
      });
  }

  public changeStateInPaginator(event: PageEvent): void {
    this.meta.page = event.pageIndex + 1;
    this.meta.limit = event.pageSize;
    this.getAllBooks();
  }

}
