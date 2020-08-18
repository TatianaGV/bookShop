import { Injectable, OnDestroy } from '@angular/core';

import { ReplaySubject, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IDataAuthor } from '../../core/interfaces/authors.interface';
import { IMetaData } from '../../core/interfaces/meta.interface';
import { AuthorsDataServices } from '../../core/data/authors.data';


export interface IAuthorsResponse {
  authors: IDataAuthor[];
  meta: IMetaData;
}

@Injectable()
export class AuthorsServices implements OnDestroy {

  public meta: IMetaData = {
    page: 1,
    limit: 10,
  };
  public allAuthors: IDataAuthor[] = [];
  public author: IDataAuthor;

  private _allAuthorsChanged$ = new Subject<any>();
  private _destroy$ = new ReplaySubject<any>(1);

  public get authorsChanged$(): Observable<any> {
    return this._allAuthorsChanged$;
  }
  constructor(
    private _authorsService: AuthorsDataServices,
  ) {
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public createAuthor(author: IDataAuthor): void {
    this._authorsService
      .createAuthor(author)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public deleteAuthor(id: number): void {
    this._authorsService
      .deleteAuthor(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.getAllAuthors();
      });
  }

  public getAllAuthors(): void {
    this._authorsService
      .getAllAuthors(this.meta)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response: IAuthorsResponse) => {
        Object.assign(this.meta, response.meta);
        this.allAuthors = response.authors;
        this._allAuthorsChanged$.next();
      });
  }

  public getAuthorById(id: number): void {
    this._authorsService
      .getAuthorById(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response: IDataAuthor) => {
        this.author = response;
      });
  }

  public updateAuthorById(author: IDataAuthor): void {
    this._authorsService
      .updateAuthorById(author)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public changeMeta(meta: IMetaData, resolver: boolean = false): void {
    Object.assign(this.meta, meta);
    if (!resolver) {
      this.getAllAuthors();
    }
  }

}
