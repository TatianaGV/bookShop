import { IDataGenre } from './genres.interface';

export interface IMetaData {
  pages?: number;
  records?: number;
  page?: number;
  limit?: number;
  title?: string;
  genres?: IDataGenre[] | number[] | string[];
  priceFrom?: number;
  priceTo?: number;
  writingDate?: Date;
  releaseDate?: Date;
}
