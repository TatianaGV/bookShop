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
import { startWith } from 'rxjs/operators';

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
    debugger;
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
      )
      .subscribe(([writingDate, releaseDate]) => {
        console.log(writingDate, releaseDate);
      });
  }

  // private _listenWritingDateControl(): void {
  //   this.writingDateControl?.valueChanges
  //     .pipe(
  //       takeUntil(this._destroy$),
  //     )
  //     .subscribe((value: string) => {
  //       if (value === null) {
  //         this.minDateRelease = null;
  //       } else if (new Date(value).getTime() !== this.minDateRelease?.getTime()) {
  //         this.minDateRelease = new Date(value);
  //       }
  //     });
  // }
  //
  // private _listenReleaseDateControl(): void {
  //   this.releaseDateControl?.valueChanges
  //     .pipe(
  //       takeUntil(this._destroy$),
  //     )
  //     .subscribe((value: string) => {
  //       if (value === null) {
  //         this.maxDateWriting = new Date(new Date().setDate(new Date().getDate() - 1));
  //       } else if (new Date(value).getTime() !== this.maxDateWriting?.getTime()) {
  //         this.maxDateWriting = new Date(value);
  //       }
  //     });
  // }

}
