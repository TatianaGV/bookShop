import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IMetaData } from '../interfaces/meta.interface';
import { BooksDataServices, IBooksResponse } from '../data/books.data';
import { IDataBook, IDataBookComplete } from '../interfaces/books.interface';
import { toRansack, RansackType } from '../helpers/ransack';


@Injectable({
  providedIn: 'root',
})
export class BooksServices implements OnDestroy {

  public meta: IMetaData = {};
  public allBooks: IDataBook[] = [];
  public book: IDataBookComplete;
  public allBooksChanged = new Subject<any>();

  private _destroy = new ReplaySubject<void>(1);

  constructor(
    private _booksService: BooksDataServices,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) {
  }

  public ngOnDestroy(): void {
    this._destroy.next();
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
    const q = toRansack(
      this.meta,
      {
        title: RansackType.Cont,
        priceTo: RansackType.Lteq,
        priceFrom: RansackType.Gteq,
        writingDate: RansackType.Eq,
        releaseDate: RansackType.Eq,
        genres: RansackType.In,
      },
    );

    this._booksService
      .getAllBooks(q)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((response: IBooksResponse) => {
        console.log(response);
        Object.assign(this.meta, response.meta);
        this.allBooks = response.books;
        this.allBooksChanged.next();
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
    Object.assign(this.meta, meta);
    console.log(this.meta);
    this.getAllBooks();
  }

}
