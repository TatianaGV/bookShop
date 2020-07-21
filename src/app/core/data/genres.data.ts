import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IMetaData } from '../interfaces/meta.interface';
import { IDataGenres } from '../interfaces/genres.interface';


export interface IGenresResponse {
  genres: IDataGenres[];
  meta: IMetaData;
}

@Injectable({
  providedIn: 'root',
})
export class GenresDataServices {

  constructor(
    private _http: HttpClient,
  ) {}

  public getAllGenres(
    params: IMetaData,
  ): Observable<IGenresResponse> {
    return this._http
      .get<IGenresResponse>(
        `${environment.apiUrl}/genres`,
        { params: <any>params },
      );
  }

}
