import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder, AbstractControl,
} from '@angular/forms';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { IDataGenre } from '../../../core/interfaces/genres.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IGenresResponse, GenresDataServices } from '../../../core/data/genres.data';
import { IBookFilter, IBookFilterUrlParams } from '../../../core/interfaces/book-filter.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksServices } from '../../../core/services/books.service';
import { ReplaySubject, forkJoin } from 'rxjs';
import { takeUntil, debounceTime, take } from 'rxjs/operators';
import { preparingDateFromUrl } from '../../../core/helpers/data.helpers';
import { GenresServices } from '../../../core/services/genres.service';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss'],
})
export class BooksFilterComponent implements OnInit, OnDestroy {

  @ViewChild('genresInput')
  public genresInput: ElementRef<HTMLInputElement>;

  public booksForm: FormGroup;
  public priceValidator = '^\\d+(?:[.,]\\d{1,2})*$';

  public filterParams: IBookFilter;
  public queryParams: IBookFilterUrlParams;

  public maxDateWriting = new Date(new Date().setDate(new Date().getDate() - 1));
  public maxDateRelease = new Date(new Date().setDate(new Date().getDate() - 1));
  public minDateRelease: Date;

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  private _priceGroup: FormGroup;

  private _min = 0;
  private _max: number;

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _genresService: GenresServices,
    private _genresDateService: GenresDataServices,
    private _booksService: BooksServices,
  ) { }

  public get priceToControl(): AbstractControl {
    return this._priceGroup.get('to');
  }

  public get priceFromControl(): AbstractControl {
    return this._priceGroup.get('from');
  }

  public get writingDateControl(): AbstractControl {
    return this.booksForm.get('writingDate');
  }

  public get releaseDateControl(): AbstractControl {
    return this.booksForm.get('releaseDate');
  }

  public ngOnInit(): void {
    this._initForm();
    this._getParamsFromUrl();
  }

  public submit(): void {
    if (this.booksForm.invalid) {
      return;
    }

    debugger;
    const writingDate = this.booksForm.value.writingDate ?
      this._parseDate(this.booksForm.value.writingDate) :
      null;

    const releaseDate = this.booksForm.value.releaseDate
      ? this._parseDate(this.booksForm.value.releaseDate)
      : null;

    if (this.booksForm.value.title === '') {
      this.booksForm.value.title = null;
    }

    this.filterParams = {
      page: 1,
      title: this.booksForm.value.title,
      genres: this.booksForm.value.genres?.map((genre) => genre.id),
      priceFrom: this.booksForm.value.price.from,
      priceTo: this.booksForm.value.price.to,
      writingDate: this.booksForm.value.writingDate,
      releaseDate: this.booksForm.value.releaseDate,
    };

    this.queryParams = {
      title: this.booksForm.value.title,
      genres: this.booksForm.value.genres?.map((genre) => genre.id),
      priceFrom: this.booksForm.value.price.from,
      priceTo: this.booksForm.value.price.to,
      writingDate,
      releaseDate,
    };

    this._setUrlParams();
    this._booksService.changeMeta(this.filterParams);
  }

  public ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }

  private _setUrlParams(): void {
    this._route.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private _initForm(): void {
    this._priceGroup = this._fb.group(
      {
        from: new FormControl('', [
          Validators.min(0),
          Validators.pattern(this.priceValidator),
        ]),
        to: new FormControl('', [
          Validators.min(0),
          Validators.pattern(this.priceValidator),
        ]),
      });


    this.booksForm = this._fb.group({
      title: new FormControl('', [
        Validators.minLength(3),
      ]),
      genres: new FormControl(null, [
      ]),
      price: this._priceGroup,
      writingDate: new FormControl('', [
      ]),
      releaseDate: new FormControl('', [
      ]),
    });

    this._subPriceToControl();
    this._subPriceFromControl();
    this._subWritingDateControl();
    this._subReleaseDateControl();
  }

  private _subPriceToControl(): void {
    this.priceToControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy),
      )
      .subscribe((value: number) => {
        if (value === null) {
          this._max = undefined;
          this.priceFromControl.setValidators(Validators.max(this._max));
          this.priceFromControl.updateValueAndValidity();
        } else if (+value !== this._max) {
          this._max = value;
          this.priceFromControl.setValidators(Validators.max(value));
          this.priceFromControl.updateValueAndValidity();
        }
      });
  }

  private _subPriceFromControl(): void {
    this.priceFromControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy),
      )
      .subscribe((value: number) => {
        if (value === null) {
          this._min = 0;
          this.priceToControl.setValidators(Validators.min(this._min));
          this.priceToControl.updateValueAndValidity();
        } else if (+value !== this._min) {
          this._min = value;
          this.priceToControl.setValidators(Validators.min(value));
          this.priceToControl.updateValueAndValidity();
        }
      });
  }

  private _subWritingDateControl(): void {
    this.writingDateControl?.valueChanges
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((value: string) => {
        if (value === null) {
          this.minDateRelease = null;
        } else if (new Date(value).getTime() !== this.minDateRelease?.getTime()) {
          this.minDateRelease = new Date(value);
        }
      });
  }

  private _subReleaseDateControl(): void {
    this.releaseDateControl?.valueChanges
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((value: string) => {
        if (value === null) {
          this.maxDateWriting = new Date(new Date().setDate(new Date().getDate() - 1));
        } else if (new Date(value).getTime() !== this.maxDateWriting?.getTime()) {
          this.maxDateWriting = new Date(value);
        }
      });
  }

  private _parseDate(datePickerValue: string): string {
    const date = new Date(datePickerValue);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (+day < 10) {
      day = '0' + day;
    }

    if (+month < 10) {
      month = '0' + month;
    }

    return `${day}-${month}-${year}`;
  }

  private _getParamsFromUrl(): void {
    const params: IBookFilter = {};

    debugger;

    const writingDataUrl = this._activatedRoute.snapshot.queryParamMap.get('writingDate');
    const writingDataParse = writingDataUrl ?
      preparingDateFromUrl(writingDataUrl) :
      null;
    if (writingDataParse) {
      params.writingDate = writingDataParse;
    }

    const releaseDataUrl = this._activatedRoute.snapshot.queryParamMap.get('releaseDate');
    const releaseDataParse = releaseDataUrl ?
      preparingDateFromUrl(releaseDataUrl) :
      null;
    if (releaseDataParse) {
      params.releaseDate = releaseDataParse;
    }

    const priceToUrl = this._activatedRoute.snapshot.queryParamMap.get('priceTo');
    if (priceToUrl) {
      params.priceTo = +priceToUrl;
    }

    const priceFromUrl = this._activatedRoute.snapshot.queryParamMap.get('priceFrom');
    if (priceFromUrl) {
      params.priceFrom = +priceFromUrl;
    }

    const titleUrl = this._activatedRoute.snapshot.queryParamMap.get('title');
    if (titleUrl) {
      params.title = titleUrl;
    }

    this._fillFilterFieldFromUrl(params);
  }

  private _fillFilterFieldFromUrl(
    params: IBookFilter,
    ): void {
    this._priceGroup.patchValue({
      to: params.priceTo,
      from: params.priceFrom,
    });

    this.booksForm.patchValue({
      title: params.title,
      writingDate: params.writingDate,
      releaseDate: params.releaseDate,
    });
  }

}
