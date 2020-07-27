import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BooksServices } from '../../../core/services/books.service';
import { ActivatedRoute } from '@angular/router';
import { IDataBook } from '../../../core/interfaces/books.interface';

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
    const id = this._route.snapshot.paramMap.get('id');
    this._booksService
      .getBookById(+id);
  }

  public get book(): IDataBook {
    return this._booksService
      .book;
  }

  public submit(): void {}

  public clear(): void {}

  public reset(): void {}

}
