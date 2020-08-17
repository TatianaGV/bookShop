import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IDataBook, IDataBookComplete } from '../interfaces/books.interface';
import { IMetaData } from '../interfaces/meta.interface';

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
    book: IDataBook,
  ): Observable<IDataBook> {
    return this._http
      .post<IDataBook>(
        `/authors/${book.author_id}/books`,
        book,
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
    book: IDataBookComplete,
  ): Observable<IDataBookComplete> {
    return this._http
      .put<IDataBookComplete>(
        `/books/${book.id}`,
        book,
      );
  }

}
