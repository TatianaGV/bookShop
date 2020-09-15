import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IBookFilter, IBookFilterUrlParams } from '../../../core/interfaces';
import { BooksServices } from '../../services/books.service';
import { parseDate } from '../../../core/helpers/data.helpers';
import { priceCrossValidator } from '../../../core/helpers/price-cross-validation';
import { dataCrossValidator } from '../../../core/helpers/data-cross-validation';

const PRICE_VALIDATOR = '^\\d+(?:[.,]\\d{1,2})*$';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.container.html',
  styleUrls: ['./filter.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContainer {

  @Input()
  public set queryParams(value: IBookFilter) {
    this.priceGroup.patchValue({
      to: value?.priceTo,
      from: value?.priceFrom,
    });

    this.booksForm.patchValue({
      title: value?.title,
      writingDate: value?.writingDate,
      releaseDate: value?.releaseDate,
    });

    this.dataGroup.patchValue({
      writingDate: value?.writingDate,
      releaseDate: value?.releaseDate,
    });
  }

  @Output()
  public readonly filledFilterForm = new EventEmitter<IBookFilterUrlParams>();

  public booksForm: FormGroup;
  public priceGroup: FormGroup;
  public dataGroup: FormGroup;

  public readonly priceValidator = PRICE_VALIDATOR;

  constructor(
    private _fb: FormBuilder,
    private _booksService: BooksServices,
  ) {
    this._initForm();
  }

  public filterSubmit(data: IBookFilter): void {
    this._booksService.changeMeta(data);

    const writingDate = data.writingDate ?
      parseDate(data.writingDate.toString()) :
      null;

    const releaseDate = data.releaseDate
      ? parseDate(data.releaseDate.toString())
      : null;

    const query: IBookFilterUrlParams = {
      title: data.title,
      genres: data.genres,
      priceFrom: data.priceFrom,
      priceTo: data.priceTo,
      writingDate,
      releaseDate,
    };

    this.filledFilterForm.emit(query);
  }


  private _initForm(): void {
    this.priceGroup = this._fb.group(
      {
        from: new FormControl('', {
          validators: [
            Validators.min(0),
            Validators.pattern(this.priceValidator),
          ],
          updateOn: 'blur',
        }),
        to: new FormControl('', {
          validators: [
            Validators.min(0),
            Validators.pattern(this.priceValidator),
          ],
          updateOn: 'blur',
        }),
      }, {
        validators: priceCrossValidator,
      });

    this.dataGroup = this._fb.group({
      writingDate: new FormControl(''),
      releaseDate: new FormControl(''),
    }, {
      validators: dataCrossValidator,
    });

    this.booksForm = this._fb.group({
      title: new FormControl('', [
        Validators.minLength(3),
      ]),
      genres: new FormControl(null, [
      ]),
      price: this.priceGroup,
      data: this.dataGroup,
    });
  }

}
