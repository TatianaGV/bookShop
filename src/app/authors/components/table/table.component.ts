import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IDataAuthor, IMetaData } from '../../../core/interfaces';
import { AuthorsServices } from '../../services/authors.service';


@Component({
  selector: 'app-authors-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class AuthorsTableComponent implements OnDestroy {

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'menu',
  ];

  @Output()
  public readonly confirmDelete = new EventEmitter<number>();

  private _destroy$ = new ReplaySubject<any>(1);

  public get allAuthors(): IDataAuthor[] {
    return this._authorsService.allAuthors;
  }

  public get metaData(): IMetaData {
    return this._authorsService.meta;
  }

  constructor(
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _authorsService: AuthorsServices,
  ) { }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public changeStateInPaginator(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this._authorsService.changeMeta({ page, limit });
  }

  public confirmDeleting(id: number): void {
    this.confirmDelete.emit(id);
  }

}
