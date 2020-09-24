import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { IBookCreation } from '../../../core/interfaces';
import { dataBookToFormData } from '../../../core/helpers/toFormData.helper';
import { BooksServices } from '../../services/books.service';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.container.html',
  styleUrls: ['./create-page.container.scss'],
})
export class CreatePageComponent implements OnInit, OnDestroy {

  public booksForm: FormGroup;
  public image: File | null;

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _route: Router,
    private _booksService: BooksServices,
    private _toaster: ToastrService,
  ) { }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({});
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public setImage (image: File): void {
    this.image = image;
  }

  public submit(): void {
    if (this.booksForm.invalid) {
      return;
    }

    const formValue = this.booksForm.value;

    const bookFormData: IBookCreation = {
      title: formValue.title,
      description: formValue.description,
      price: formValue.price,
      author: formValue.author,
      genres: formValue.genres,
      writingDate: formValue.writingDate,
      releaseDate: formValue.releaseDate,
      image: this.image,
    };

    const book = dataBookToFormData(bookFormData);
    this._createBook(book);
  }

  private _createBook(book: FormData): void {
    this._booksService
      .createBook(book)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((resp) => {
        if (resp) {
          this._toaster.success('Book has been saved');
          this._route.navigate(['/books']);
        } else {
          this._toaster.error('Save error');
        }
      });
  }

}
