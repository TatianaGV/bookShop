import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IBookFilter, IBookFilterUrlParams } from '../../../core/interfaces';
import { preparingDateFromUrl } from '../../../core/helpers/data.helpers';

@Component({
  selector: 'app-filter-view',
  templateUrl: './filter.view.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterView implements OnInit {

  public queryParams: IBookFilter = {};

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  public ngOnInit(): void {
    this._getParamsFromUrl();
  }

  public setUrlParams(params: IBookFilterUrlParams): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private _getParamsFromUrl(): void {
    const writingDataUrl = this._activatedRoute.snapshot.queryParamMap.get('writingDate');
    const writingDataParse = writingDataUrl ?
      preparingDateFromUrl(writingDataUrl) :
      null;
    if (writingDataParse) {
      this.queryParams.writingDate = writingDataParse;
    }

    const releaseDataUrl = this._activatedRoute.snapshot.queryParamMap.get('releaseDate');
    const releaseDataParse = releaseDataUrl ?
      preparingDateFromUrl(releaseDataUrl) :
      null;
    if (releaseDataParse) {
      this.queryParams.releaseDate = releaseDataParse;
    }

    const priceToUrl = this._activatedRoute.snapshot.queryParamMap.get('priceTo');
    if (priceToUrl) {
      this.queryParams.priceTo = +priceToUrl;
    }

    const priceFromUrl = this._activatedRoute.snapshot.queryParamMap.get('priceFrom');
    if (priceFromUrl) {
      this.queryParams.priceFrom = +priceFromUrl;
    }

    const titleUrl = this._activatedRoute.snapshot.queryParamMap.get('title');
    if (titleUrl) {
      this.queryParams.title = titleUrl;
    }
  }

}
