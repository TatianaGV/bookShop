import { Injectable } from '@angular/core';

import { IMetaData } from '../interfaces/meta.interface';
import { IDataGenres } from '../interfaces/genres.interface';
import { GenresDataServices, IGenresResponse } from '../data/genres.data';


@Injectable({
  providedIn: 'root',
})
export class GenresServices {

  public allGenres: IDataGenres[] = [];

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
      .subscribe((response: IGenresResponse) => {
        this.allGenres = response.genres;
      });
  }

}
