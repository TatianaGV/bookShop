import {
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { ReplaySubject } from 'rxjs';

import { IDataBook, IMetaData, IBookFilter } from '../../../core/interfaces';
import { BooksServices } from '../../services/books.service';


@Component({
  selector: 'app-books-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class BooksTableComponent implements OnDestroy {

  @Input()
  public loadedData = false;

  @Output()
  public readonly confirmDelete = new EventEmitter<number>();

  @Output()
  public readonly changePaginator = new EventEmitter<IBookFilter>();

  public path = 'http://gulyakina.kubesh.ru';
  public alt = 'assets/pic/agenda.png';
  public displayedColumns: string[] = [
    'id',
    'image',
    'description',
    'authorId',
    'title',
    'price',
    'genres',
    'writingDate',
    'releaseDate',
    'menu',
  ];

  private _destroy$ = new ReplaySubject<any>(1);

  constructor(
    private _booksService: BooksServices,
  ) { }

  public get allBooks(): IDataBook[] {
    return this._booksService.allBooks;
  }

  public get metaData(): IMetaData {
    return this._booksService.meta;
  }


  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public changeStateInPaginator(event: PageEvent): void {
    const paginator: IBookFilter = {
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };
    this.changePaginator.emit(paginator);
  }

  public confirmDeleting(id: number): void {
    this.confirmDelete.emit(id);
  }

}
