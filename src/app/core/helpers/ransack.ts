import { IMetaData } from '../interfaces/meta.interface';

enum RansackType {
  title_cont = 'title',
  price_gteq = 'priceTo',
  price_lteq = 'priceFrom',
  writing_date_eq = 'writingDate',
  release_date_eq = 'releaseDate',
}

export function toRansack(obj: string, type: RansackType): any {
  const key = `q[${type}]`;
  const val = `${obj}`;

  return {
    key: val,
  };
}

export function prepareParams(meta: IMetaData): any {
  if (meta.title) {
    toRansack(meta.title, RansackType.title_cont);
  }
}
