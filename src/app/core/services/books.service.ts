import { Injectable } from '@angular/core';

import { IMetaData } from '../interfaces/meta.interface';
import { BooksDataServices, IBooksResponse } from '../data/books.data';
import { IDataBooks } from '../interfaces/books.interface';


@Injectable({
  providedIn: 'root',
})
export class BooksServices {

  public meta: IMetaData = {};
  public allBooks: IDataBooks[] = [];

  constructor(
    private _booksService: BooksDataServices,
  ) {
    this.getAllBooks(this.meta);
  }

  public createBook(book: IDataBooks): void {
    this._booksService
      .createBook(book)
      .subscribe((response) => {
        console.log(response);
      });
  }

  public getAllBooks(meta: IMetaData): void {
    this._booksService
      .getAllBooks(meta)
      .subscribe((response: IBooksResponse) => {
        this.meta = response.meta;
        this.allBooks = response.books;
      });
  }

}
