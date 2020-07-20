import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IDataAuthors } from '../interfaces/authors.interface';
import { IMetaData } from '../interfaces/meta.interface';


export interface IAuthorsResponse {
  authors: IDataAuthors[];
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

}
