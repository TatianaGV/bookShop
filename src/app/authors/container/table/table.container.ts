import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorsConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AuthorsServices } from '../../services/authors.service';
import { IDataAuthor } from '../../../core/interfaces';

@Component({
  selector: 'app-authors-table-container',
  templateUrl: './table.container.html',
  styleUrls: ['./table.container.scss'],
})
export class AuthorsTableContainer implements OnInit, OnDestroy {

  private _destroy$ = new ReplaySubject<any>(1);

  constructor(
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _authorsService: AuthorsServices,
  ) { }

  public ngOnInit(): void {
    this._checkResolve();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public get allAuthors(): IDataAuthor[] {
    return this._authorsService.allAuthors;
  }

  public confirmDeleting(id: number): void {
    const dialogRef = this._dialog.open(AuthorsConfirmDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((result) => {
        if (result) {
          if (this.allAuthors.length === 1) {
            const page = this._authorsService.meta.page - 1;
            const pages = this._authorsService.meta.pages - 1;
            this._authorsService.changeMeta({ page, pages });
          }
          this._authorsService
            .deleteAuthor(id);
        }
      });
  }

  private _checkResolve(): void {
    this._activatedRoute.data
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((resp) => {
        const {
          author: {
            authors,
            meta,
          },
        } = resp;
        this._authorsService.changeMeta(meta, true);
        Object.assign(this._authorsService.allAuthors, authors);
      });
  }

}
