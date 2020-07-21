import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthorsDataServices, IAuthorsResponse } from '../../../core/data/authors.data';
import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { GenresDataServices, IGenresResponse } from '../../../core/data/genres.data';
import { IDataGenres } from '../../../core/interfaces/genres.interface';


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
        Validators.required,
      ]),
      author: new FormControl(null, [
        Validators.required,
      ]),
      genres: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required,
      ]),
      price: new FormControl(null, [
        Validators.required,
      ]),
      writeDate: new FormControl(null, [
        Validators.required,
      ]),
      releasDate: new FormControl(null, [
        Validators.required,
      ]),
    });
  }


}
