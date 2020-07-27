import { Injectable, OnDestroy } from '@angular/core';

import { IDataAuthor } from '../interfaces/authors.interface';
import { IMetaData } from '../interfaces/meta.interface';
import { AuthorsDataServices } from '../data/authors.data';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


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

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _authorsService: AuthorsDataServices,
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
      .subscribe((response) => {
        console.log(response);
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
      });
  }

}
