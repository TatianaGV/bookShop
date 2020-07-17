import { Component, OnInit } from '@angular/core';

import { IDataBooks } from '../../../core/interfaces/books.interface';
import { BooksDataServices, IBooksResponce } from '../../../core/data/books.data';


@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})

export class BooksTableComponent implements OnInit {

  public displayedColumns: string[] =
    ['id', 'description', 'authorId', 'title', 'price', 'genres', 'writingDate', 'releaseDate'];

  public dataSource: IDataBooks[] = [];

  constructor(private _booksService: BooksDataServices) { }

  public ngOnInit(): void {
    this.getAllBooks();
  }

  public getAllBooks(): void {
    this._booksService
      .getAllBooks()
      .subscribe((response: IBooksResponce) => {
        this.dataSource = response.books;
      });
  }
}
