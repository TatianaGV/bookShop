import { Component } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { IDataAuthor } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { AuthorsServices } from '../../../core/services/authors.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthorsConfirmDialogComponent } from '../authors-confirm-dialog/authors-confirm-dialog.component';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
})
export class AuthorsTableComponent {

  public meta: IMetaData;

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'menu',
  ];

  constructor(
    private _authorsService: AuthorsServices,
    public dialog: MatDialog,
  ) { }

  public get allAuthors(): IDataAuthor[] {
    return this._authorsService.allAuthors;
  }

  public get metaData(): IMetaData {
    return this._authorsService.meta;
  }

  public changeStateInPaginator(event: PageEvent): void {
    this.meta = {
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };
    this._authorsService
      .getAllAuthors(this.meta);
  }

  public confirmDeleting(id: number): void {
    const dialogRef = this.dialog.open(AuthorsConfirmDialogComponent);
    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this._authorsService
            .deleteAuthor(id, this.meta);
        }
      });
  }

}
