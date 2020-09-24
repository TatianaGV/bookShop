import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { IMetaData } from '../../../core/interfaces';
import { AuthorsServices } from '../../services/authors.service';

@Component({
  selector: 'app-authors-panels',
  templateUrl: './panels.view.html',
  styleUrls: ['./panels.view.scss'],
})
export class AuthorsPanelsComponent implements OnInit, OnDestroy {

  public panelOpenState = true;
  public panelTwoOpenState = true;

  private _destroy$ = new ReplaySubject<any>(1);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _authorsService: AuthorsServices,
  ) { }

  public get metaData(): IMetaData {
    return this._authorsService.meta;
  }

  public ngOnInit(): void {
    this._listenQueryParams();
    this._listenUrlParams();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
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
      });
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

}
