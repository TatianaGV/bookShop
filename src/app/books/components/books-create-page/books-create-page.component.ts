import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { Observable, fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { IDataGenres } from '../../../core/interfaces/genres.interface';
import { IBookCreation } from '../../../core/interfaces/book-form.interface';
import { IDataBooks } from '../../../core/interfaces/books.interface';
import { BooksServices } from '../../../core/services/books.service';
import { AuthorsServices } from '../../../core/services/authors.service';
import { GenresServices } from '../../../core/services/genres.service';


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
  public selectableGenres: IDataGenres[] = [];

  public bookFormData: IBookCreation = {};

  @ViewChild('genresInput')
  public genresInput: ElementRef<HTMLInputElement>;

  @ViewChild('priceInput', { static: true })
  public priceInput: ElementRef<HTMLInputElement>;

  @ViewChild('autoGenres')
  public matAutocompleteGenres: MatAutocomplete;

  @ViewChild('autoAuthors')
  public matAutocompleteAuthors: MatAutocomplete;

  constructor(
    private _authorService: AuthorsServices,
    private _genresService: GenresServices,
    private _booksService: BooksServices,
    ) {
  }

  public ngOnInit(): void {
    this._initForm();
    this.filteredOptions$ = this.booksForm.get('author').valueChanges
      .pipe(
        startWith(''),
        map((value: string | null) =>
          value ? this._filter(value) : this.allAuthors.slice()),
      );
    fromEvent(this.priceInput.nativeElement, 'keydown')
      .pipe()
      .subscribe((e: KeyboardEvent) => {
        console.log(e.code);
        if (e.code === 'KeyE' || e.code === 'Minus') {
          e.preventDefault();
        }
      });
  }

  public get allAuthors(): IDataAuthors[] {
    return this._authorService
      .allAuthors;
  }

  public get allGenres(): IDataGenres[] {
    return this._genresService
      .allGenres;
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

  public createBook(item: IDataBooks): void {
    this._booksService
      .createBook(item);
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
        genres: this.booksForm.value.genres,
        writingDate: this.booksForm.value.writingDate,
        releaseDate: this.booksForm.value.releaseDate,
      };
      const book = this._prepareObjBeforeCreate(this.bookFormData);
      this.createBook(book);
    } else {
      alert('Date of release can not be early than writing date');
    }
  }

  private _initForm(): void {
    this.booksForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256),
      ]),
      author: new FormControl(null, [
        Validators.required,
        Validators.maxLength(256),
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

  private _prepareObjBeforeCreate(book: IBookCreation): IDataBooks {
    return {
      id: null,
      description: book.description,
      title: book.title,
      author_id: book.author.id,
      price: book.price,
      genres: book.genres,
      writing_date: book.writingDate,
      release_date: book.releaseDate,
    };
  }

}
