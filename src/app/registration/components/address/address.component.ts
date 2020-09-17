import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { ReplaySubject, Observable, of } from 'rxjs';
import { takeUntil, startWith, map, debounce, debounceTime, switchMap, tap } from 'rxjs/operators';

import { CountryService } from '../../services/country.service';
import { ICountry } from '../../../core/interfaces/country.interface';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, OnDestroy {

  public allCountry: ICountry[];
  public filteredCountry$: Observable<ICountry[]>;
  public loaded = false;

  @Input()
  public addressForm: FormGroup;

  private _destroy$ = new ReplaySubject<void>(1);

  public get countryControl(): AbstractControl {
    return this.addressForm.get('country');
  }

  constructor(
    private _countryService: CountryService,
  ) { }

  public ngOnInit(): void {
    this._getAllCountry();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public displayValue(value?: ICountry): string {
    return !value ? '' : `${value.name}`;
  }

  public submit(): void {
  }

  private _getAllCountry(): void {
    this._countryService
      .getAllCountry()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((responce) => {
        debugger;
        this.allCountry = responce;
        this._filterCountry();
      });
  }

  private _filterCountry(): void {
    this.filteredCountry$ = this.countryControl?.valueChanges
      .pipe(
        tap(() => {
          this.loaded = true;
        }),
        debounceTime(1000),
        startWith(''),
        switchMap((value: string | null) => {
          debugger;
          this.loaded = false;
          if (value) {
            if (typeof value === 'string') {
              return this._countryService
                .getCountryByName(value)
                .pipe(
                  takeUntil(this._destroy$),
                );
            } else {
              return of([value]); // если выбрали страну из списка, то сразу ее вернуть
            }
          } else {
            return of(this.allCountry.slice());
          }
        }),
      );
  }

}
