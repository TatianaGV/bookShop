import { Injectable } from '@angular/core';

import { IDataAuthors } from '../interfaces/authors.interface';
import { IMetaData } from '../interfaces/meta.interface';
import { AuthorsDataServices } from '../data/authors.data';


export interface IAuthorsResponse {
  authors: IDataAuthors[];
  meta: IMetaData;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorsServices {

  public meta: IMetaData = {};
  public allAuthors: IDataAuthors[] = [];

  constructor(
    private _authorsService: AuthorsDataServices,
  ) {
    this.getAllAuthors(this.meta);
  }

  public createAuthor(author: IDataAuthors): void {
    this._authorsService
      .createAuthor(author)
      .subscribe((response) => {
        console.log(response);
      });
  }

  public getAllAuthors(meta: IMetaData): void {
    this._authorsService
      .getAllAuthors(meta)
      .subscribe((response: IAuthorsResponse) => {
        this.meta = response.meta;
        this.allAuthors = response.authors;
      });
  }

}
