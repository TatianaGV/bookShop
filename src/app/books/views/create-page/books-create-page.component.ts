import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { IBookCreation } from '../../../core/interfaces';
import { BooksServices } from '../../services/books.service';
import { dataBookToFormData } from '../../../core/helpers/prepare-object.helper';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { error } from '@angular/compiler/src/util';


@Component({
  templateUrl: './books-create-page.component.html',
  styleUrls: ['./books-create-page.component.scss'],
})
export class BooksCreatePageComponent implements OnInit, OnDestroy {

  public booksForm: FormGroup;
  public image: File | null;

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _route: Router,
    private _booksService: BooksServices,
    ) {
  }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({});
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createBook(book: FormData): void {
    this._booksService
      .createBook(book)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((resp) => {
        if (resp) {
          this._route.navigate(['/books']);
        } else {
          throw error('Error Save');
        }
      });
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
      image: this.image,
    };
    const book = dataBookToFormData(bookFormData);
    this.createBook(book);
  }

  public getImage(image: File): void {
    this.image = image;
  }

}
