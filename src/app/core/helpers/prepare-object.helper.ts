import { IBookCreation } from '../interfaces';

export function prepareObjBeforeCreate(book: IBookCreation): FormData {
  const formData = new FormData();
  formData.append('description', book.description);
  formData.append('title', book.title);
  formData.append('author_id', book.author.id.toString());
  formData.append('price', book.price.toString());
  formData.append('genres', JSON.stringify(book.genres));
  formData.append('writing_date', book.writingDate);
  formData.append('release_date', book.releaseDate);
  formData.append('image', book.image);

  return formData;
}
