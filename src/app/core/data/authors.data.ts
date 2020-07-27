import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IDataAuthor } from '../interfaces/authors.interface';
import { IMetaData } from '../interfaces/meta.interface';


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
    params: IMetaData,
  ): Observable<IAuthorsResponse> {
    return this._http
      .get<IAuthorsResponse>(
        `${environment.apiUrl}/authors`,
        { params: <any>params },
      );
  }

  public createAuthor(
    author: IDataAuthor,
  ): Observable<IDataAuthor> {
    return this._http
      .post<IDataAuthor>(
        `${environment.apiUrl}/authors`, author);
  }

}
