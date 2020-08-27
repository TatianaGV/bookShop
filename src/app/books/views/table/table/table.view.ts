import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { IBookFilter } from '../../../../core/interfaces';
import { getDateFromUrl } from '../../../../core/helpers/data.helpers';

@Component({
  selector: 'app-table-view',
  templateUrl: './table.view.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableView implements OnInit, OnDestroy {

  public queryParams: IBookFilter = {};

  private _destroy$ = new ReplaySubject<any>(1);

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  public ngOnInit(): void {
    this._listenQueryParams();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public setUrlParams(params: IBookFilter): void {
    this._router.navigate([], {
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
      .subscribe(
        (queryParam: any) => {
          this.queryParams.page = queryParam['page'] || 1;
          this.queryParams.limit = queryParam['limit'] || 10;
          this.queryParams.title = queryParam['title'];
          this.queryParams.priceTo = queryParam['priceTo'];
          this.queryParams.priceFrom = queryParam['priceFrom'];
          this.queryParams.genres = queryParam['genres'];
          this.queryParams.writingDate = getDateFromUrl(queryParam['writingDate']);
          this.queryParams.releaseDate = getDateFromUrl(queryParam['releaseDate']);
        });
  }

}
