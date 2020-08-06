import { Injectable, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IDataAuthor } from '../interfaces/authors.interface';
import { IMetaData } from '../interfaces/meta.interface';
import { AuthorsDataServices } from '../data/authors.data';


export interface IAuthorsResponse {
  authors: IDataAuthor[];
  meta: IMetaData;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorsServices implements OnDestroy {

  public meta: IMetaData = {};
  public allAuthors: IDataAuthor[] = [];
  public author: IDataAuthor;

  public allAuthorsChanged = new EventEmitter<any>();

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _authorsService: AuthorsDataServices,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) {
  }

  public ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }

  public createAuthor(author: IDataAuthor): void {
    this._authorsService
      .createAuthor(author)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe();
  }

  public deleteAuthor(id: number): void {
    this._authorsService
      .deleteAuthor(id)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this.getAllAuthors();
      });
  }

  public getAllAuthors(): void {
    this._authorsService
      .getAllAuthors({ page: this.meta.page, limit: this.meta.limit })
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((response: IAuthorsResponse) => {
        this.meta = response.meta;
        this.allAuthors = response.authors;
        this.allAuthorsChanged.emit();
      });
  }

  public getAuthorById(id: number): void {
    this._authorsService
      .getAuthorById(id)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((response: IDataAuthor) => {
        this.author = response;
      });
  }

  public updateAuthorById(author: IDataAuthor): void {
    this._authorsService
      .updateAuthorById(author)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe();
  }

  public changeMeta(meta: IMetaData): void {
    this.meta = { ...this.meta, ...meta };
    this.getAllAuthors();
  }

}
