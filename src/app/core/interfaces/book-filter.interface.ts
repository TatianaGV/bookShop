import { IDataGenre } from './genres.interface';

interface IBookParent {
  page?: number;
  title?: string;
  priceFrom?: number;
  priceTo?: number;
}

export interface IBookFilter extends IBookParent {
  genres?: IDataGenre[];
  writingDate?: Date;
  releaseDate?: Date;
}

export interface IBookFilterUrlParams extends IBookParent {
  genres?: string[];
  writingDate?: string;
  releaseDate?: string;
}
