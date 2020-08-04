import { IDataGenres } from './genres.interface';

export interface IBookFilter {
  title?: string;
  genres?: IDataGenres[];
  priceFrom?: any;
  priceTo?: any;
  writingData?: string;
  releaseData?: string;
}
