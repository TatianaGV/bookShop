import { Injectable, OnDestroy } from '@angular/core';
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

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _authorsService: AuthorsDataServices,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) {
    this.getAllAuthors(this.meta);
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

  public deleteAuthor(id: number, meta: IMetaData): void {
    this._authorsService
      .deleteAuthor(id)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this.getAllAuthors(meta);
      });
  }

  public getAllAuthors(meta: IMetaData): void {
    this._authorsService
      .getAllAuthors(meta)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((response: IAuthorsResponse) => {
        this.meta = response.meta;
        this.allAuthors = response.authors;
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

}
