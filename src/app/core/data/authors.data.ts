import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IDataAuthor, IMetaData } from '../interfaces';


export interface IAuthorsResponse {
  authors: IDataAuthor[];
  meta: IMetaData;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorsDataServices {

  constructor(
    private _http: HttpClient,
  ) {}

  public getAllAuthors(
    params: IMetaData = { page: 1, limit: 10 },
  ): Observable<IAuthorsResponse> {
    return this._http
      .get<IAuthorsResponse>(
        '/authors',
        { params: <any>params },
      );
  }

  public createAuthor(
    author: IDataAuthor,
  ): Observable<IDataAuthor> {
    return this._http
      .post<IDataAuthor>(
        '/authors', author);
  }

  public deleteAuthor(
    id: number,
  ): Observable<{}> {
    return this._http
      .delete(
        `/authors/${id}`);
  }

  public getAuthorById(
    id: number,
  ): Observable<IDataAuthor> {
    return this._http
      .get<IDataAuthor>(
        `/authors/${id}`,
      );
  }

  public updateAuthorById(
    author: IDataAuthor,
  ): Observable<IDataAuthor> {
    return this._http
      .put<IDataAuthor>(
        `/authors/${author.id}`,
        author,
      );
  }

}
