import { Injectable, OnDestroy } from '@angular/core';

import { ReplaySubject, Observable } from 'rxjs';

import { CountryData } from '../../core/data/country.data';
import { ICountry } from '../../core/interfaces/country.interface';

@Injectable()
export class CountryService implements OnDestroy {

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _countryService: CountryData,
  ) {
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getAllCountry(): Observable<ICountry[]> {
    return this._countryService
      .getAllCountry();
  }

  public getCountryByName(name: string): Observable<ICountry[]> {
    return this._countryService
      .getCountryByName(name);
  }

}
