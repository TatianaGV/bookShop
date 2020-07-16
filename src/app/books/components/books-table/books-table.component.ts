import { Component, OnInit } from '@angular/core';

import { IDataBooks } from '../../../core/interfaces/books-interface';

const DATA_BOOKS: IDataBooks[] = [
  { id: 1,
    description: "I didn't work hard to make Ruby perfect for everyone, because you feel differently from me. No language can be perfect for everyone. I tried to make Ruby perfect for me, but maybe it's not perfect for you. The perfect language for Guido van Rossum is probably Python.",
    authorId: 1,
    title: "All the King's Men",
    price: 1582.0,
    genres: 'Science fiction',
    writingDate: '2007-07-07T00:00:00.000Z',
    releaseDate: '2012-10-29T00:00:00.000Z',
  },
  { id: 2,
    description: "I didn't work hard to make Ruby perfect for everyone, because you feel differently from me. No language can be perfect for everyone. I tried to make Ruby perfect for me, but maybe it's not perfect for you. The perfect language for Guido van Rossum is probably Python.",
    authorId: 4,
    title: "All the King's Men",
    price: 1322.64,
    genres: 'Science fiction',
    writingDate: '2007-07-07T00:00:00.000Z',
    releaseDate: '2012-10-29T00:00:00.000Z',
  },
];

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})

export class BooksTableComponent implements OnInit {

  public displayedColumns: string[] =
    ['id', 'description', 'authorId', 'title', 'price', 'genres', 'writingDate', 'releaseDate'];

  public dataSource = DATA_BOOKS;

  constructor() { }

  public ngOnInit(): void {
  }

}
