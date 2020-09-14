import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { BooksServices } from '../../services/books.service';
import { IBookCreation, IDataBookComplete } from '../../../core/interfaces';
import { dataBookToFormData } from '../../../core/helpers/toFormData.helper';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {

  public get book(): IDataBookComplete {
    return this._booksService
      .book;
  }

  public booksForm: FormGroup;
  public image: File | null;

  private _destroy$ = new ReplaySubject<void>(1);
  private _id: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _booksService: BooksServices,
    private _toaster: ToastrService,
  ) { }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({});
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
    this._booksService.getBookById(+this._id);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(): void {
    if (this.booksForm.invalid) {
      return;
    }

    const formValue = this.booksForm.value;

    const bookFormData: IBookCreation = {
      id: formValue.id,
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
    this._updateBook(book);
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
      image: this.image,
    });
  }

  public setImage(image: File): void {
    this.image = image;
  }

  private _updateBook(book: FormData): void {
    this._booksService
      .updateBook(book, +this._id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((resp) => {
        if (resp) {
          this._toaster.success('Book has been updated');
          this._route.navigate(['/books']);
        } else {
          this._toaster.error('Save error');
        }
      });
  }

}
