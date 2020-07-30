import { IDataGenres } from './genres.interface';

export interface IBookFilter {
  title?: string;
  genres?: IDataGenres[];
  priceFrom?: number;
  priceTo?: number;
  writingData?: string;
  releaseData?: string;
}
