import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IBookCreation } from '../../../core/interfaces/book-form.interface';
import { IDataBook } from '../../../core/interfaces/books.interface';
import { BooksServices } from '../../../core/services/books.service';
import { AuthorsServices } from '../../../core/services/authors.service';
import { GenresServices } from '../../../core/services/genres.service';


@Component({
  selector: 'app-books-create-item',
  templateUrl: './books-create-page.component.html',
  styleUrls: ['./books-create-page.component.scss'],
})
export class BooksCreatePageComponent implements OnInit {

  public booksForm: FormGroup = new FormGroup({});

  constructor(
    private _authorService: AuthorsServices,
    private _genresService: GenresServices,
    private _booksService: BooksServices,
    ) {
  }

  public ngOnInit(): void {
  }

  public checkDate(): boolean {
    const writingDate = this.booksForm.value.writingDate;
    const releaseDate = this.booksForm.value.releaseDate;

    return writingDate < releaseDate;
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
    if (this.checkDate()) {
      const bookFormData: IBookCreation = {
        title: this.booksForm.value.title,
        description: this.booksForm.value.description,
        price: this.booksForm.value.price,
        author: this.booksForm.value.author,
        genres: this.booksForm.value.genres,
        writingDate: this.booksForm.value.writingDate,
        releaseDate: this.booksForm.value.releaseDate,
      };
      const book = this._prepareObjBeforeCreate(bookFormData);
      console.log(book);
      this.createBook(book);
    } else {
      alert('Date of release can not be early than writing date');
    }
  }


  private _prepareObjBeforeCreate(book: IBookCreation): IDataBook {
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
