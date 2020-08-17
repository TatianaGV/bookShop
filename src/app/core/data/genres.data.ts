import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IMetaData } from '../interfaces/meta.interface';
import { IDataGenre } from '../interfaces/genres.interface';


export interface IGenresResponse {
  genres: IDataGenre[];
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
        '/genres',
        { params: <any>params },
      );
  }

  public getGenresById(
    id: number,
  ): Observable<IDataGenre> {
    return this._http
      .get<IDataGenre>(
        `/genres/${id}`,
      );
  }

}
