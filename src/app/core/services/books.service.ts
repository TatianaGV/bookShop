import { Injectable, OnDestroy } from '@angular/core';

import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

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

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _booksService: BooksDataServices,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) {
    this.getAllBooks(this.meta);
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

  public getAllBooks(meta: IMetaData): void {
    this._booksService
      .getAllBooks(meta)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((response: IBooksResponse) => {
        this.meta = response.meta;
        this.allBooks = response.books;
        this._route.navigate([], {
          relativeTo: this._activatedRoute,
          queryParams: {
            page: this.meta.page,
            limit: this.meta.limit,
          },
          queryParamsHandling: 'merge',
        });
      });
  }

  public deleteBook(id: number, meta: IMetaData): void {
    this._booksService
      .deleteBook(id)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this.getAllBooks(meta);
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

}
