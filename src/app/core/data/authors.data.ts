import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IDataAuthors } from '../interfaces/authors.interface';


export interface IAuthorsResponse {
  authors: IDataAuthors[];
  meta: Meta;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorsDataServices {

  constructor(
    private _http: HttpClient,
  ) {}

  public getAllAuthors(): Observable<IAuthorsResponse> {
    return this._http
      .get<IAuthorsResponse>(`${environment.apiUrl}/authors`);
  }

}
