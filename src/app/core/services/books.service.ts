import { Injectable, OnDestroy, EventEmitter } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IMetaData } from '../interfaces/meta.interface';
import { BooksDataServices, IBooksResponse } from '../data/books.data';
import { IDataBook, IDataBookComplete } from '../interfaces/books.interface';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class BooksServices implements OnDestroy {

  public meta: IMetaData = {};
  public allBooks: IDataBook[] = [];
  public book: IDataBookComplete;
  public allBooksChanged = new EventEmitter<any>();

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _booksService: BooksDataServices,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) {
  }

  public ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }

  public createBook(book: IDataBook): void {
    this._booksService
      .createBook(book)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe();
  }

  public getAllBooks(): void {
    this._booksService
      .getAllBooks({ page: this.meta.page, limit: this.meta.limit })
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((response: IBooksResponse) => {
        this.meta = response.meta;
        this.allBooks = response.books;
        this.allBooksChanged.emit();
      });
  }

  public deleteBook(id: number): void {
    this._booksService
      .deleteBook(id)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this.getAllBooks();
      });
  }

  public getBookById(id: number): void {
    this._booksService
      .getBookById(id)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((response: IDataBookComplete) => {
        this.book = response;
      });
  }

  public changeMeta(meta: IMetaData): void {
    meta = { ...this.meta, ...meta };
    this.meta.pages = meta.pages;
    this.meta.limit = meta.limit;
    this.meta.page = meta.page;
    this.getAllBooks();
  }

}
