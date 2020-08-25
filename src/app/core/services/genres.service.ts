import { Injectable, OnDestroy } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IMetaData, IDataGenre } from '../interfaces';
import { GenresDataServices, IGenresResponse } from '../data/genres.data';


@Injectable({
  providedIn: 'root',
})
export class GenresServices implements OnDestroy {

  public allGenres: IDataGenre[] = [];
  private _destroy$ = new ReplaySubject<any>(1);


  constructor(
    private _genresService: GenresDataServices,
  ) {
    this.getAllGenres();
  }

  public getAllGenres(): void {
    const meta: IMetaData = {
      limit: 100,
    };
    this._genresService
      .getAllGenres(meta)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response: IGenresResponse) => {
        this.allGenres = response.genres;
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
