export interface IDataBooks {
  id: number;
  description: string;
  author_id: number;
  title: string;
  price: number;
  genres: [{
    id: number;
    name: string;
  }];
  writing_date: string;
  release_date: string;
}
