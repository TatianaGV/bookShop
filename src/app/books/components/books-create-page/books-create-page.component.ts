import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorsDataServices, IAuthorsResponse } from '../../../core/data/authors.data';
import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { GenresDataServices, IGenresResponse } from '../../../core/data/genres.data';
import { IDataGenres } from '../../../core/interfaces/genres.interface';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface IBookCreation {
  title?: string;
  author?: IDataAuthors;
  genres?: IDataGenres[];
  description?: string;
  price?: number;
  writingDate?: string;
  releaseDate?: string;
}

@Component({
  selector: 'app-books-create-item',
  templateUrl: './books-create-page.component.html',
  styleUrls: ['./books-create-page.component.scss'],
})
export class BooksCreatePageComponent implements OnInit {

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public booksForm: FormGroup;

  public allAuthors: IDataAuthors[] = [];
  public allGenres: IDataGenres[] = [];

  public selectableGenres: IDataGenres[] = [];

  public meta: IMetaData = {};
  public formData: IBookCreation = {};

  @ViewChild('genresInput')
  public genresInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto')
  public matAutocomplete: MatAutocomplete;


  constructor(
    private _authorService: AuthorsDataServices,
    private _genresService: GenresDataServices,
    ) {
  }

  public ngOnInit(): void {
    this._initForm();
    this.getAllAuthors();
    this.getAllGenres();
  }

  public remove(fruit: IDataGenres): void {
    const index = this.selectableGenres.indexOf(fruit);
    if (index >= 0) {
      this.selectableGenres.splice(index, 1);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectableGenres.push(event.option.value);
    this.genresInput.nativeElement.value = '';
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
    this.formData = {
      title: this.booksForm.value.title,
      description: this.booksForm.value.description,
      price: this.booksForm.value.price,
      author: this.booksForm.value.author,
      genres: this.selectableGenres,
      writingDate: this.booksForm.value.writingDate,
      releaseDate: this.booksForm.value.releaseDate,
    };
  }

  private _initForm(): void {
    this.booksForm = new FormGroup({
      title: new FormControl(null, [
      ]),
      author: new FormControl(null, [
      ]),
      genres: new FormControl(null, [
      ]),
      description: new FormControl(null, [
      ]),
      price: new FormControl(null, [
      ]),
      writingDate: new FormControl(null, [
      ]),
      releaseDate: new FormControl(null, [
      ]),
    });
  }

}
