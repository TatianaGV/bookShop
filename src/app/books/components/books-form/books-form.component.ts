import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';

import { Observable, fromEvent } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { IDataAuthor } from '../../../core/interfaces/authors.interface';
import { IDataGenres } from '../../../core/interfaces/genres.interface';
import { AuthorsServices } from '../../../core/services/authors.service';
import { GenresServices } from '../../../core/services/genres.service';
import { BooksServices } from '../../../core/services/books.service';
import { IDataBookComplete } from '../../../core/interfaces/books.interface';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss'],
})
export class BooksFormComponent implements OnInit {

  @Input()
  public booksForm: FormGroup;

  @Input()
  public set book(book: IDataBookComplete) {
    if (book) {
      this.booksForm.patchValue({
        title: book.title,
        price: book.price,
        author: book.author,
        description: book.description,
        writingDate: book.writing_date,
        releaseDate: book.release_date,
      });
      this.selectableGenres = book.genres;
    }
  }

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public priceValidator = '^\\d+(?:[.,]\\d{1,2})*$';

  public filteredOptions$: Observable<IDataAuthor[]>;
  public selectableGenres: IDataGenres[] = [];

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
  ) { }

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
        if (e.code === 'KeyE' || e.code === 'Minus') {
          e.preventDefault();
        }
      });
  }

  public get allAuthors(): IDataAuthor[] {
    return this._authorService
      .allAuthors;
  }

  public get allGenres(): IDataGenres[] {
    return this._genresService
      .allGenres;
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

  public displayValue(value?: IDataAuthor): string {
    return !value ? '' : `${value.first_name} ${value.last_name}`;
  }

  private _initForm(): void {
    this.booksForm.addControl('title', new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256),
    ]));

    this.booksForm.addControl('genres', new FormControl(null, [
      Validators.required,
    ]));

    this.booksForm.addControl('price', new FormControl(null, [
      Validators.required,
      Validators.pattern(this.priceValidator),
    ]));

    this.booksForm.addControl('author', new FormControl(null, [
      Validators.required,
      Validators.maxLength(256),
    ]));

    this.booksForm.addControl('description', new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(1000),
    ]));

    this.booksForm.addControl('writingDate', new FormControl(null, [
      Validators.required,
    ]));

    this.booksForm.addControl('releaseDate', new FormControl(null, [
      Validators.required,
    ]));
  }

  private _filter(value: string | IDataAuthor): IDataAuthor[] {
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
