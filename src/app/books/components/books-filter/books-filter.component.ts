import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { IDataGenres } from '../../../core/interfaces/genres.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IGenresResponse, GenresDataServices } from '../../../core/data/genres.data';
import { IBookFilter } from '../../../core/interfaces/book-filter.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksServices } from '../../../core/services/books.service';
import { checkingPriceDifference } from '../../share/price-validation';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss'],
})
export class BooksFilterComponent implements OnInit, OnDestroy {

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public priceValidator = '^\\d+(?:[.,]\\d{1,2})*$';
  public allGenres: IDataGenres[] = [];
  public selectableGenres: IDataGenres[] = [];

  public booksForm: FormGroup;

  public filterParams: IBookFilter;

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);


  @ViewChild('genresInput')
  public genresInput: ElementRef<HTMLInputElement>;

  constructor(
    private _genresService: GenresDataServices,
    private _booksService: BooksServices,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) { }

  public ngOnInit(): void {
    this._initForm();
    this.getAllGenres();
  }

  public submit(): void {
    if (this.booksForm.invalid) {
      return;
    }
    this.filterParams = {
      title: this.booksForm.value.title,
      genres: this.booksForm.value.genres,
      priceFrom: this.booksForm.value.price.priceFrom,
      priceTo: this.booksForm.value.price.priceTo,
      writingData: this.booksForm.value.writingData,
      releaseData: this.booksForm.value.releaseData,
    };
    this._setUrlParams();
    this._booksService.changeMeta(this.filterParams);
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    if (this.selectableGenres.indexOf(event.option.value) === -1) {
      this.selectableGenres.push(event.option.value);
      this.booksForm.get('genres').setValue(this.selectableGenres);
    }
    this.genresInput.nativeElement.value = '';
  }

  public remove(fruit: IDataGenres): void {
    const index = this.selectableGenres.indexOf(fruit);
    if (index >= 0) {
      this.selectableGenres.splice(index, 1);
    }
  }

  public getAllGenres(): void {
    const meta = {
      limit: 100,
    };
    this._genresService
      .getAllGenres(meta)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((response: IGenresResponse) => {
        this.allGenres = response.genres;
      });
  }

  public ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }

  private _setUrlParams(): void {
    this._route.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this.filterParams,
      queryParamsHandling: 'merge',
    });
  }

  private _initForm(): void {
    this.booksForm = this._fb.group({
      title: new FormControl('', [
        Validators.minLength(3),
      ]),
      genres: new FormControl(null, [
      ]),
      price: this._fb.group(
        {
          priceFrom: new FormControl('', [
            Validators.min(0),
            Validators.max(1000000),
            Validators.pattern(this.priceValidator),
          ]),
          priceTo: new FormControl('', [
            Validators.min(0),
            Validators.max(1000000),
            Validators.pattern(this.priceValidator),
          ]),
        },
        {
          validators: checkingPriceDifference,
        },
      ),
      writingData: new FormControl('', [
      ]),
      releaseData: new FormControl('', [
      ]),
    });
  }

}
