import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BooksServices } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDataBook, IDataBookComplete } from '../../../core/interfaces/books.interface';
import { IBookCreation } from '../../../core/interfaces/book-form.interface';

@Component({
  selector: 'app-books-edit-page',
  templateUrl: './books-edit-page.component.html',
  styleUrls: ['./books-edit-page.component.scss'],
})
export class BooksEditPageComponent implements OnInit {

  public booksForm: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _booksService: BooksServices,
  ) { }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({});
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this._booksService
      .getBookById(+id);
  }

  public get book(): IDataBookComplete {
    return this._booksService
      .book;
  }

  public updateBook(item: IDataBook): void {
    this._booksService
      .createBook(item);
  }

  public submit(): void {
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
   //const book = prepareObjBeforeCreate(bookFormData);
    //this.updateBook(book);
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
