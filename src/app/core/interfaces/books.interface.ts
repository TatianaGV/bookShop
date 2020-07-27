import { IDataGenres } from './genres.interface';
import { IDataAuthor } from './authors.interface';

export interface IDataBook {
  id: number;
  description: string;
  author_id: number;
  title: string;
  price: number;
  genres: IDataGenres[];
  writing_date: string;
  release_date: string;
}

export interface IDataBookComplete extends IDataBook {
  author: IDataAuthor;
}
