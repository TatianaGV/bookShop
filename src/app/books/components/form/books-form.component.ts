import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
  HostListener,
  Output, EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatFormFieldAppearance } from '@angular/material/form-field';

import { Observable, fromEvent, ReplaySubject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';

import { IDataAuthor, IDataBookComplete } from '../../../core/interfaces';
import { AuthorsDataServices } from '../../../core/data/authors.data';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss'],
})
export class BooksFormComponent implements OnInit, OnDestroy {

  @Input()
  public set book(book: IDataBookComplete) {
    if (book) {
      this.booksForm.patchValue({
        title: book.title,
        price: book.price,
        author: book.author,
        genres: book.genres,
        description: book.description,
        writingDate: book.writing_date,
        releaseDate: book.release_date,
      });
      if (book.image) {
        this.bookPicture = this.path + book.image;
      }
    }
  }

  @Input()
  public booksForm: FormGroup;

  @Output()
  public readonly addedImage = new EventEmitter<File>();

  @ViewChild('genresInput')
  public genresInput: ElementRef<HTMLInputElement>;

  @ViewChild('priceInput', { static: true })
  public priceInput: ElementRef<HTMLInputElement>;

  @ViewChild('autoGenres')
  public matAutocompleteGenres: MatAutocomplete;

  @ViewChild('autoAuthors')
  public matAutocompleteAuthors: MatAutocomplete;

  public priceValidator = '^\\d+(?:[.,]\\d{1,2})*$';

  public path = 'http://gulyakina.kubesh.ru';
  public filteredOptions$: Observable<IDataAuthor[]>;
  public allAuthors: IDataAuthor[] = [];

  public bookPicture = 'assets/pic/agenda.png';

  public maxDateWriting = new Date(new Date().setDate(new Date().getDate() - 1));
  public maxDateRelease = new Date(new Date().setDate(new Date().getDate() - 1));
  public minDateRelease: Date;

  public appearanceFill: MatFormFieldAppearance = 'fill';

  private _destroy$ = new ReplaySubject<any>(1);

  constructor(
    private _authorService: AuthorsDataServices,
  ) { }

  // valueChanges ?
  @HostListener('change', ['$event.target.files'])
  public previewImage(event: FileList): void {
    const file = event && event.item(0);
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this.bookPicture = <string>e.target.result;
    };
    if (file && file.type.match('image.*')) {
      fileReader.readAsDataURL(file);
      this.addedImage.emit(file);
    }
  }

  public get writingDateControl(): AbstractControl {
    return this.booksForm.get('writingDate');
  }

  public get releaseDateControl(): AbstractControl {
    return this.booksForm.get('releaseDate');
  }

  public get priceControl(): AbstractControl {
    return this.booksForm.get('price');
  }

  public get descriptionControl(): AbstractControl {
    return this.booksForm.get('description');
  }

  public get authorControl(): AbstractControl {
    return this.booksForm.get('author');
  }

  public get titleControl(): AbstractControl {
    return this.booksForm.get('title');
  }

  public ngOnInit(): void {
    this._getAuthors();
    this._initForm();
    this._filterAuthors();
    this._filterInput();
  }

  public displayValue(value?: IDataAuthor): string {
    return !value ? '' : `${value.first_name} ${value.last_name}`;
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _initForm(): void {
    this.booksForm.addControl('image', new FormControl(null));

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

    this.booksForm.updateValueAndValidity();

    this._listenWritingDateControl();
    this._listenReleaseDateControl();
  }

  private _filter(value: string | IDataAuthor): IDataAuthor[] {
    if (typeof value === 'string') {
      return this.allAuthors
        .filter((author) => {
          return author.first_name
            .toLowerCase()
            .includes(value.toLowerCase());
        });
    } else {
      return [value];
    }
  }

  private _filterInput(): void {
    fromEvent(this.priceInput.nativeElement, 'keydown')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((e: KeyboardEvent) => {
        if (e.code === 'KeyE' || e.code === 'Minus') {
          e.preventDefault();
        }
      });
  }

  private _filterAuthors(): void {
    this.filteredOptions$ = this.booksForm
      .get('author')
      .valueChanges
      .pipe(
        startWith(''),
        map((value: string | null) =>
          value ? this._filter(value) : this.allAuthors.slice()),
      );
  }

  private _listenWritingDateControl(): void {
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

  private _listenReleaseDateControl(): void {
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

  private _getAuthors(): void {
    this._authorService.getAllAuthors({ limit: 100 })
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.allAuthors = response.authors;
      });
  }

}
