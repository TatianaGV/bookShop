import { IBookCreation, IDataBook } from '../interfaces';

export function prepareObjBeforeCreate(book: IBookCreation): IDataBook {
  return {
    id: null,
    description: book.description,
    title: book.title,
    author_id: book.author.id,
    price: book.price,
    genres: book.genres,
    writing_date: book.writingDate,
    release_date: book.releaseDate,
  };
}
