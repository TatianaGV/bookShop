import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryData {

  constructor(
    private _http: HttpClient,
  ) {}

  public getAllCountry(
  ): Observable<ICountry[]> {
    return this._http
      .get<ICountry[]>('http://restcountries.eu/rest/v2/all');
  }

  public getCountryByName(
    name: string,
  ): Observable<ICountry[]> {
    return this._http
      .get<ICountry[]>(`https://restcountries.eu/rest/v2/name/${name}`);
  }

}
