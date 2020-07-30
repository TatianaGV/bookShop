import { IDataGenres } from './genres.interface';

export interface IMetaData {
  pages?: number;
  records?: number;
  page?: number;
  limit?: number;
  title?: string;
  genres?: IDataGenres[];
  priceFrom?: number;
  priceTo?: number;
  writingDate?: string;
  releaseDate?: string;
}
