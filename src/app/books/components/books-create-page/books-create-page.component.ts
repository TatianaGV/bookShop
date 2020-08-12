import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IBookCreation } from '../../../core/interfaces/book-form.interface';
import { IDataBook } from '../../../core/interfaces/books.interface';
import { BooksServices } from '../../../core/services/books.service';
import { AuthorsServices } from '../../../core/services/authors.service';
import { GenresServices } from '../../../core/services/genres.service';
import { Router } from '@angular/router';
import {prepareObjBeforeCreate} from "../../../core/helpers/prepare-object.helper";


@Component({
  selector: 'app-books-create-item',
  templateUrl: './books-create-page.component.html',
  styleUrls: ['./books-create-page.component.scss'],
})
export class BooksCreatePageComponent implements OnInit {

  public booksForm: FormGroup;

  constructor(
    private _route: Router,
    private _authorService: AuthorsServices,
    private _genresService: GenresServices,
    private _booksService: BooksServices,
    ) {
  }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({});
  }

  public createBook(item: IDataBook): void {
    this._booksService
      .createBook(item);
  }

  public submit(): void {
    this.booksForm.markAllAsTouched();
    if (this.booksForm.invalid) {
      return;
    }
    const bookFormData: IBookCreation = {
      title: this.booksForm.value.title,
      description: this.booksForm.value.description,
      price: this.booksForm.value.price,
      author: this.booksForm.value.author,
      genres: this.booksForm.value.genres,
      writingDate: this.booksForm.value.writingDate,
      releaseDate: this.booksForm.value.releaseDate,
    };
    const book = prepareObjBeforeCreate(bookFormData);
    this.createBook(book);
    this._route.navigate(['/books']);
  }

}
