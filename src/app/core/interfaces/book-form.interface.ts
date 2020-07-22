import { IDataAuthors } from './authors.interface';
import { IDataGenres } from './genres.interface';

export interface IBookCreation {
  title?: string;
  author?: IDataAuthors;
  genres?: IDataGenres[];
  description?: string;
  price?: number;
  writingDate?: string;
  releaseDate?: string;
}
