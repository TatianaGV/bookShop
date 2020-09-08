import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  Output, EventEmitter
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { takeUntil, filter } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import {
  IBookFilter,
  IMetaData,
  IDataBook,
  IBookFilterUrlParams
} from '../../../../core/interfaces';
import { BooksServices } from '../../../services/books.service';
import { BooksConfirmDialogComponent } from '../../../components/confirm-dialog/books-confirm-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.container.html',
  styleUrls: ['./table.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainer implements OnInit, OnDestroy {

  @Input()
  public set queryParams(params: IBookFilter) {
    if (+params.page !== this.metaData.page || +params.limit !== this.metaData.limit) {
      this._booksService.changeMeta(params);
    }
  }

  @Output()
  public readonly booksChanged = new EventEmitter<IBookFilterUrlParams>();

  public loadedData = false;

  private _destroy$ = new ReplaySubject<any>(1);

  public get metaData(): IMetaData {
    return this._booksService.meta;
  }

  public get allBooks(): IDataBook[] {
    return this._booksService.allBooks;
  }

  constructor(
    public dialog: MatDialog,
    private _booksService: BooksServices,
  ) { }

  public ngOnInit(): void {
    this._listenBookChange();

    if (this.allBooks.length !== 0) {
      this.loadedData = true;
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public confirmDeleting(id: number): void {
    const dialogRef = this.dialog.open(BooksConfirmDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        if (this.allBooks.length === 1) {
          const page = this._booksService.meta.page - 1;
          const pages = this._booksService.meta.pages - 1;
          this._booksService.changeMeta({ page, pages });
        }
        this._booksService
          .deleteBook(id);
      });
  }

  public getData(data: IBookFilter): void {
    this._booksService.changeMeta(data);
  }

  private _listenBookChange(): void {
    this._booksService.booksChanged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        const params = {
          page: this.metaData.page,
          limit: this.metaData.limit,
        };
        this.booksChanged.emit(params);
        this.loadedData = true;
      });
  }

}
