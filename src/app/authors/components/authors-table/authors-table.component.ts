import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IDataAuthor } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { AuthorsServices } from '../../services/authors.service';
import { AuthorsConfirmDialogComponent } from '../authors-confirm-dialog/authors-confirm-dialog.component';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
})
export class AuthorsTableComponent implements OnInit, OnDestroy {

  public loadedData = false;

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'menu',
  ];

  private _destroy$ = new ReplaySubject<any>(1);

  constructor(
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _authorsService: AuthorsServices,
  ) { }

  public get allAuthors(): IDataAuthor[] {
    return this._authorsService.allAuthors;
  }

  public get metaData(): IMetaData {
    return this._authorsService.meta;
  }

  public ngOnInit(): void {
    this._checkResolve();
    this._listenQueryParams();
    this._listenUrlParams();

    if (this.allAuthors?.length !== 0) {
      this.loadedData = true;
    }
  }

  public changeStateInPaginator(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this._authorsService.changeMeta({ page, limit });
  }

  public confirmDeleting(id: number): void {
    const dialogRef = this.dialog.open(AuthorsConfirmDialogComponent);
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

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _setUrlParams(): void {
    const params = {
      page: this.metaData.page,
      limit: this.metaData.limit,
    };
    this._route.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  private _listenQueryParams(): void {
    this._activatedRoute.queryParams
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((queryParam: any) => {
        const page = queryParam['page'];
        const limit = queryParam['limit'];
        if (page !== undefined && limit !== undefined) {
          if (+page !== this.metaData.page || +limit !== this.metaData.limit) {
            this._authorsService.changeMeta(
              {
                page,
                limit,
              });
          }
        }
      });
  }

  private _listenUrlParams(): void {
    this._authorsService.authorsChanged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._setUrlParams();
        this.loadedData = true;
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
