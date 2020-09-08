import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IDataBook, IDataBookComplete, IMetaData } from '../interfaces';

export interface IBooksResponse {
  books: IDataBook[];
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
    params: any,
    ): Observable<IBooksResponse> {
    return this._http
      .get<IBooksResponse>(
        '/books',
        { params: <any>params },
      );
  }

  public createBook(
    bookFormData: FormData,
  ): Observable<FormData> {
    return this._http
      .post<FormData>(
        '/authors/1/books',
        bookFormData,
      );
  }

  public deleteBook(
    id: number,
  ): Observable<{}> {
    return this._http
      .delete(
        `/books/${id}`,
      );
  }

  public getBookById(
    id: number,
  ): Observable<IDataBookComplete> {
    return this._http
      .get<IDataBookComplete>(
        `/books/${id}`,
      );
  }

  public updateBookById(
    book: FormData,
    id: number,
  ): Observable<IDataBookComplete> {
    return this._http
      .put<IDataBookComplete>(
        `/books/${id}`,
        book,
      );
  }

}
