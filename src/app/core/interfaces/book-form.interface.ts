import { IDataAuthor } from './authors.interface';
import { IDataGenres } from './genres.interface';

export interface IBookCreation {
  title?: string;
  author?: IDataAuthor;
  genres?: IDataGenres[];
  description?: string;
  price?: number;
  writingDate?: string;
  releaseDate?: string;
}
