import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, Validators, AbstractControl, } from '@angular/forms';

import { MatFormFieldAppearance } from '@angular/material/form-field';

import { ReplaySubject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { IBookFilter } from '../../../core/interfaces';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksFilterComponent implements OnInit, OnDestroy {

  @Input()
  public booksFilterForm: FormGroup;

  @Input()
  public priceGroupForm: FormGroup;

  @Output()
  public readonly filterSubmit = new EventEmitter<IBookFilter>();

  @ViewChild('genresInput')
  public genresInput: ElementRef<HTMLInputElement>;

  public filterParams: IBookFilter;

  public maxDateWriting = new Date(new Date().setDate(new Date().getDate() - 1));
  public maxDateRelease = new Date(new Date().setDate(new Date().getDate() - 1));
  public minDateRelease: Date;

  public appearanceStandard: MatFormFieldAppearance = 'standard';

  private _min = 0;
  private _max: number;

  private _destroy$ = new ReplaySubject<any>(1);

  constructor() { }

  public get priceToControl(): AbstractControl {
    return this.priceGroupForm.get('to');
  }

  public get priceFromControl(): AbstractControl {
    return this.priceGroupForm?.get('from');
  }

  public get writingDateControl(): AbstractControl {
    return this.booksFilterForm?.get('writingDate');
  }

  public get releaseDateControl(): AbstractControl {
    return this.booksFilterForm?.get('releaseDate');
  }

  public ngOnInit(): void {
    this._subPriceToControl();
    this._subPriceFromControl();
    this._subWritingDateControl();
    this._subReleaseDateControl();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public submit(): void {
    if (this.booksFilterForm.invalid) {
      return;
    }

    const formValue = this.booksFilterForm.value;

    if (formValue.title === '') {
      formValue.title = null;
    }

    this.filterParams = {
      page: 1,
      title: formValue.title,
      genres: formValue.genres?.map((genre) => genre.id),
      priceFrom: formValue.price.from,
      priceTo: formValue.price.to,
      writingDate: formValue.writingDate,
      releaseDate: formValue.releaseDate,
    };

    this.filterSubmit.emit(this.filterParams);
  }

  private _subPriceToControl(): void {
    this.priceToControl?.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy$),
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
    this.priceFromControl?.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy$),
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
        takeUntil(this._destroy$),
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
        takeUntil(this._destroy$),
      )
      .subscribe((value: string) => {
        if (value === null) {
          this.maxDateWriting = new Date(new Date().setDate(new Date().getDate() - 1));
        } else if (new Date(value).getTime() !== this.maxDateWriting?.getTime()) {
          this.maxDateWriting = new Date(value);
        }
      });
  }

}
