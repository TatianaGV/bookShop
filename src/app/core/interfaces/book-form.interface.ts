import { IDataAuthor } from './authors.interface';
import { IDataGenre } from './genres.interface';

export interface IBookCreation {
  title?: string;
  author?: IDataAuthor;
  genres?: IDataGenre[];
  description?: string;
  price?: number;
  writingDate?: string;
  releaseDate?: string;
}
