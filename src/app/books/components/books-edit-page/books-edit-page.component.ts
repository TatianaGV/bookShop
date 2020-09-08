import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BooksServices } from '../../services/books.service';
import { IDataBookComplete, IBookCreation } from '../../../core/interfaces';
import { prepareObjBeforeCreate } from '../../../core/helpers/prepare-object.helper';

@Component({
  selector: 'app-books-edit-page',
  templateUrl: './books-edit-page.component.html',
  styleUrls: ['./books-edit-page.component.scss'],
})
export class BooksEditPageComponent implements OnInit {

  public booksForm: FormGroup;

  private _id: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _booksService: BooksServices,
  ) { }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({});
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
    this._booksService
      .getBookById(+this._id);
  }

  public get book(): IDataBookComplete {
    return this._booksService
      .book;
  }

  public submit(): void {
    if (this.booksForm.invalid) {
      return;
    }

    const bookFormData: IBookCreation = {
      id: this.booksForm.value.id,
      title: this.booksForm.value.title,
      description: this.booksForm.value.description,
      price: this.booksForm.value.price,
      author: this.booksForm.value.author,
      genres: this.booksForm.value.genres,
      writingDate: this.booksForm.value.writingDate,
      releaseDate: this.booksForm.value.releaseDate,
    };
    debugger;
    const book = prepareObjBeforeCreate(bookFormData);
    this._booksService.updateBook(book, +this._id);
    this._route
      .navigate(['/books']);
  }

  public clear(): void {
    this.booksForm.reset();
  }

  public reset(): void {
    this.booksForm.reset({
      title: this.book.title,
      price: this.book.price,
      author: this.book.author,
      description: this.book.description,
      writingDate: this.book.writing_date,
      releaseDate: this.book.release_date,
    });
  }

}
