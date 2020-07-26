import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IDataBooks } from '../interfaces/books.interface';
import { IMetaData } from '../interfaces/meta.interface';

export interface IBooksResponse {
  books: IDataBooks[];
  meta: IMetaData;
}

@Injectable({
  providedIn: 'root',
})
export class BooksDataServices {

  constructor(
    private _http: HttpClient,
  ) {}

  public getAllBooks(
    params: IMetaData,
    ): Observable<IBooksResponse> {
    return this._http
      .get<IBooksResponse>(
        `${environment.apiUrl}/books`,
        { params: <any>params },
      );
  }

  public createBook(book: IDataBooks): Observable<IDataBooks> {
    return this._http
      .post<IDataBooks>(
        `${environment.apiUrl}/authors/${book.id}/books`, book);
  }

}
