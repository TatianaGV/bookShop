import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { IDataGenres } from '../../../core/interfaces/genres.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IGenresResponse, GenresDataServices } from '../../../core/data/genres.data';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { IDataBook } from '../../../core/interfaces/books.interface';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss'],
})
export class BooksFilterComponent implements OnInit {

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public priceValidator = '^\\d+(?:[.,]\\d{1,2})*$';
  public allGenres: IDataGenres[] = [];
  public selectableGenres: IDataGenres[] = [];
  public meta: IMetaData = {};

  public booksForm: FormGroup;

  @ViewChild('genresInput')
  public genresInput: ElementRef<HTMLInputElement>;

  constructor(
    private _genresService: GenresDataServices,
  ) { }

  public ngOnInit(): void {
    this._initForm();
    this.getAllGenres();
  }

  public submit(): void {
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    if (this.selectableGenres.indexOf(event.option.value) === -1) {
      this.selectableGenres.push(event.option.value);
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
    this.meta = {
      limit: 100,
    };
    this._genresService
      .getAllGenres(this.meta)
      .subscribe((response: IGenresResponse) => {
        this.allGenres = response.genres;
      });
  }

  private _initForm(): void {
    this.booksForm = new FormGroup({
      title: new FormControl(null, [
        Validators.minLength(3),
      ]),
      genres: new FormControl(null, [
      ]),
      priceFrom: new FormControl(null, [
        Validators.pattern(this.priceValidator),
      ]),
      priceTo: new FormControl(null, [
        Validators.pattern(this.priceValidator),
      ]),
      writingDate: new FormControl(null, [
      ]),
      releaseDate: new FormControl(null, [
      ]),
    });
  }

}
