import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { AuthorsDataServices, IAuthorsResponse } from '../../../core/data/authors.data';
import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { GenresDataServices, IGenresResponse } from '../../../core/data/genres.data';
import { IDataGenres } from '../../../core/interfaces/genres.interface';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IBookCreation } from '../../../core/interfaces/book-form.interface';


@Component({
  selector: 'app-books-create-item',
  templateUrl: './books-create-page.component.html',
  styleUrls: ['./books-create-page.component.scss'],
})
export class BooksCreatePageComponent implements OnInit {

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public priceValidator = '^\\d+(?:[.,]\\d{1,2})*$';
  public booksForm: FormGroup;

  public filteredOptions$: Observable<IDataAuthors[]>;

  public allAuthors: IDataAuthors[] = [];
  public allGenres: IDataGenres[] = [];

  public selectableGenres: IDataGenres[] = [];

  public meta: IMetaData = {};
  public bookFormData: IBookCreation = {};

  @ViewChild('genresInput')
  public genresInput: ElementRef<HTMLInputElement>;

  @ViewChild('autoGenres')
  public matAutocompleteGenres: MatAutocomplete;

  @ViewChild('autoAuthors')
  public matAutocompleteAuthors: MatAutocomplete;


  constructor(
    private _authorService: AuthorsDataServices,
    private _genresService: GenresDataServices,
    ) {
  }

  public ngOnInit(): void {
    this._initForm();
    this.getAllAuthors();
    this.getAllGenres();
    this.filteredOptions$ = this.booksForm.get('author').valueChanges
      .pipe(
        startWith(''),
        map((value: string | null) =>
          value ? this._filter(value) : this.allAuthors.slice()),
      );
  }

  public remove(fruit: IDataGenres): void {
    const index = this.selectableGenres.indexOf(fruit);
    if (index >= 0) {
      this.selectableGenres.splice(index, 1);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    if (this.selectableGenres.indexOf(event.option.value) === -1) {
      this.selectableGenres.push(event.option.value);
      this.booksForm.get('genres').setValue(this.selectableGenres);
    }
    this.genresInput.nativeElement.value = '';
  }

  public displayValue(value?: IDataAuthors): string {
    return !value ? '' : `${value.first_name} ${value.last_name}`;
  }

  public checkDate(): boolean {
    const writingDate = this.booksForm.value.writingDate;
    const releaseDate = this.booksForm.value.releaseDate;

    return writingDate < releaseDate;
  }

  public getAllAuthors(): void {
    this._authorService
      .getAllAuthors(this.meta)
      .subscribe((response: IAuthorsResponse) => {
        this.allAuthors = response.authors;
      });
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

  public submit(): void {
    if (this.booksForm.invalid) {
      return;
    }
    if (this.checkDate()) {
      this.bookFormData = {
        title: this.booksForm.value.title,
        description: this.booksForm.value.description,
        price: this.booksForm.value.price,
        author: this.booksForm.value.author,
        genres: this.selectableGenres,
        writingDate: this.booksForm.value.writingDate,
        releaseDate: this.booksForm.value.releaseDate,
      };
    } else {
      alert('Date of release can not be early than writing date');
    }
  }

  private _initForm(): void {
    this.booksForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      author: new FormControl(null, [
        Validators.required,
      ]),
      genres: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.priceValidator),
      ]),
      writingDate: new FormControl(null, [
        Validators.required,
      ]),
      releaseDate: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  private _filter(value: string | IDataAuthors): IDataAuthors[] {
    if (typeof value === 'string') {
      return this.allAuthors
        .filter((author) => author.first_name
          .toLowerCase()
          .includes(value.toLowerCase()),
        );
    } else {
      return [value];
    }
  }

}
