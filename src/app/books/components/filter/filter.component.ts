import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, Validators, AbstractControl, } from '@angular/forms';

import { MatFormFieldAppearance } from '@angular/material/form-field';

import { ReplaySubject, combineLatest } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { IBookFilter } from '../../../core/interfaces';


@Component({
  selector: 'app-books-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
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

  private _destroy$ = new ReplaySubject<any>(1);

  constructor() { }

  public get priceToControl(): AbstractControl {
    return this.priceGroupForm.get('to');
  }

  public get priceFromControl(): AbstractControl {
    return this.priceGroupForm?.get('from');
  }

  public get writingDateControl(): AbstractControl {
    return this.booksFilterForm?.get('data').get('writingDate');
  }

  public get releaseDateControl(): AbstractControl {
    return this.booksFilterForm?.get('data').get('releaseDate');
  }

  public get titleControl(): AbstractControl {
    return this.booksFilterForm?.get('title');
  }

  public ngOnInit(): void {
    this._listenWritingDateControl();
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
      writingDate: formValue.data.writingDate,
      releaseDate: formValue.data.releaseDate,
    };

    this.filterSubmit.emit(this.filterParams);
  }

  private _listenWritingDateControl(): void {
    const writingDateChange$ = this.writingDateControl
      .valueChanges
      .pipe(
        startWith(''),
      );
    const releaseDateChange$ = this.releaseDateControl
      .valueChanges
      .pipe(
        startWith(''),
      );

    combineLatest<Date[]>([
      writingDateChange$,
      releaseDateChange$,
    ])
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(([writingDate, releaseDate]) => {
        if (writingDate) {
          this.minDateRelease = null;
          if (new Date(writingDate) !== this.minDateRelease) {
            this.minDateRelease = writingDate;
          }
        }
        if (releaseDate) {
          this.maxDateWriting = new Date(new Date().setDate(new Date().getDate() - 1));
          if (new Date(releaseDate).getTime() !== this.maxDateWriting?.getTime()) {
            this.maxDateWriting = releaseDate;
          }
        }
      });
  }

}
