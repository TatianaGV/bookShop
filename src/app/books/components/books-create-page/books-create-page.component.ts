import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorsDataServices, IAuthorsResponse } from '../../../core/data/authors.data';
import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { GenresDataServices, IGenresResponse } from '../../../core/data/genres.data';
import { IDataGenres } from '../../../core/interfaces/genres.interface';

export interface IBookCreation {
  title?: string;
  author?: IDataAuthors;
  genres?: IDataGenres;
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

  public allAuthors: IDataAuthors[] = [];
  public allGenres: IDataGenres[] = [];

  public meta: IMetaData = {};

  public booksForm: FormGroup;
  public formData: IBookCreation = {};

  constructor(
    private _authorService: AuthorsDataServices,
    private _genresService: GenresDataServices,
    ) { }

  public ngOnInit(): void {
    this._initForm();
    this.getAllAuthors();
    this.getAllGenres();
  }

  public submit(): void {
    if (this.booksForm.invalid) {
      console.log('invalid form');

      return;
    }
    this.formData = {
      title: this.booksForm.value.title,
      description: this.booksForm.value.description,
      price: this.booksForm.value.price,
      author: this.booksForm.value.author,
      genres: this.booksForm.value.genres,
      writingDate: this.booksForm.value.writingDate,
      releaseDate: this.booksForm.value.releaseDate,
    };
    console.log(this.formData);
  }

  public getAllAuthors(): void {
    this._authorService
      .getAllAuthors(this.meta)
      .subscribe((responce: IAuthorsResponse) => {
        this.allAuthors = responce.authors;
      });
  }

  public getAllGenres(): void {
    this.meta = {
      limit: 100,
    };
    this._genresService
      .getAllGenres(this.meta)
      .subscribe((responce: IGenresResponse) => {
        this.allGenres = responce.genres;
      });
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
