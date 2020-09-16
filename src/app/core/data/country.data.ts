import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryData {

  constructor(
    private _http: HttpClient,
  ) {}

  public getAllCountry(
  ): Observable<any> {
    // в интерсепторе добавляется лишнее. как убрать?
    return this._http
      .get<any>('/restcountries.eu/rest/v2/all');
  }

}
