import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BooksServices } from '../../../core/services/books.service';
import { ActivatedRoute } from '@angular/router';
import { IDataBookComplete } from '../../../core/interfaces/books.interface';

@Component({
  selector: 'app-books-edit-page',
  templateUrl: './books-edit-page.component.html',
  styleUrls: ['./books-edit-page.component.scss'],
})
export class BooksEditPageComponent implements OnInit {

  public booksForm: FormGroup;

  constructor(
    private _booksService: BooksServices,
    private _route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({});
    const id = this._route.snapshot.paramMap.get('id');
    this._booksService
      .getBookById(+id);
  }

  public get book(): IDataBookComplete {
    return this._booksService
      .book;
  }

  public submit(): void {

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
