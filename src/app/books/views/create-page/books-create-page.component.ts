import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { IBookCreation } from '../../../core/interfaces';
import { BooksServices } from '../../services/books.service';
import { prepareObjBeforeCreate } from '../../../core/helpers/prepare-object.helper';


@Component({
  templateUrl: './books-create-page.component.html',
  styleUrls: ['./books-create-page.component.scss'],
})
export class BooksCreatePageComponent implements OnInit {

  public booksForm: FormGroup;
  public image: File | null;

  constructor(
    private _route: Router,
    private _booksService: BooksServices,
    ) {
  }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({});
  }

  public createBook(book: FormData): void {
    this._booksService
      .createBook(book);
  }

  public submit(): void {
    this.booksForm.markAllAsTouched();
    if (this.booksForm.invalid) {
      return;
    }
    debugger;
    const bookFormData: IBookCreation = {
      title: this.booksForm.value.title,
      description: this.booksForm.value.description,
      price: this.booksForm.value.price,
      author: this.booksForm.value.author,
      genres: this.booksForm.value.genres,
      writingDate: this.booksForm.value.writingDate,
      releaseDate: this.booksForm.value.releaseDate,
      image: this.image,
    };
    const book = prepareObjBeforeCreate(bookFormData);
    this.createBook(book);
    this._route.navigate(['/books']);
  }

  public getImage(image: File): void {
    this.image = image;
  }

}
