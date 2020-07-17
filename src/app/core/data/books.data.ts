import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IDataBooks } from '../interfaces/books.interface';

export interface IBooksResponce {
  books: IDataBooks[];
  meta: Meta;
}

@Injectable({
  providedIn: 'root',
})
export class BooksDataServices {

  constructor(
    private _http: HttpClient,
  ) {}

  public getAllBooks(): Observable<IBooksResponce> {
    return this._http
      .get<IBooksResponce>(`${environment.apiUrl}/books`);
  }

}
