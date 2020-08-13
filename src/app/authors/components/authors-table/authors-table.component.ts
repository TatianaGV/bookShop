import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { IDataAuthor } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { AuthorsServices } from '../../../core/services/authors.service';
import { AuthorsConfirmDialogComponent } from '../authors-confirm-dialog/authors-confirm-dialog.component';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


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

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _authorsService: AuthorsServices,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) { }

  public get allAuthors(): IDataAuthor[] {
    return this._authorsService.allAuthors;
  }

  public get metaData(): IMetaData {
    return this._authorsService.meta;
  }

  public ngOnInit(): void {
    this._listenQueryParams();
    this._listenUrlParams();

    if (this.allAuthors.length !== 0) {
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
        takeUntil(this._destroy),
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
    this._destroy.next(null);
    this._destroy.complete();
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
        takeUntil(this._destroy),
      )
      .subscribe(
        (queryParam: any) => {
          const page = queryParam['page'] || 1;
          const limit = queryParam['limit'] || 10;
          const firstName = queryParam['first_name'];
          const lastName = queryParam['last_name'];
          if (+page !== this.metaData.page || +limit !== this.metaData.limit) {
            this._authorsService.changeMeta(
              {
                page,
                limit,
                firstName,
                lastName,
              });
          }
        });
  }

  private _listenUrlParams(): void {
    this._authorsService.allAuthorsChanged
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this._setUrlParams();
        this.loadedData = true;
      });
  }

}
