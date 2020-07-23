import { IDataGenres } from './genres.interface';

export interface IDataBooks {
  id: number;
  description: string;
  author_id: number;
  title: string;
  price: number;
  genres: IDataGenres[];
  writing_date: string;
  release_date: string;
}
