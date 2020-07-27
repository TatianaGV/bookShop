import { Component } from '@angular/core';

import { IDataBook } from '../../../core/interfaces/books.interface';
import { IBooksResponse } from '../../../core/data/books.data';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { PageEvent } from '@angular/material/paginator';
import { BooksServices } from '../../../core/services/books.service';
import { MatDialog } from '@angular/material/dialog';
import { BooksConfirmDialogComponent } from '../books-confirm-dialog/books-confirm-dialog.component';


@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})

export class BooksTableComponent {

  public displayedColumns: string[] = [
    'id',
    'description',
    'authorId',
    'title',
    'price',
    'genres',
    'writingDate',
    'releaseDate',
    'menu',
  ];

  constructor(
    private _booksService: BooksServices,
    public dialog: MatDialog,
  ) { }


  public get allBooks(): IDataBook[] {
    return this._booksService.allBooks;
  }

  public get metaData(): IMetaData {
    return this._booksService.meta;
  }

  public changeStateInPaginator(event: PageEvent): void {
    const meta: IMetaData = {
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };
    this._booksService
      .getAllBooks(meta);
  }

  public confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(BooksConfirmDialogComponent);
    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this._booksService
            .deleteBook(id);
        }
      });
  }

}
