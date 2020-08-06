import { snakeCase } from 'lodash-es';

import { IMetaData } from '../interfaces/meta.interface';
import { IRansackMeta } from '../interfaces/ransack-meta.interface';

export enum RansackType {
  Cont ,
  Gteq ,
  Lteq ,
  Eq ,
  In,
}

export function toRansack(obj: any, type: { [key: string]: RansackType | RansackType[] }): any {
  const result = { ...obj };
  debugger;
  Object.keys(type)
    .forEach((key) => {
      if (result[key]) {
        let transformedKey = snakeCase(key);
        if (Array.isArray(type[key])) {
          let idx = 0;
          (type[key] as [])
            .forEach((elem) => {
              const keyType = prepareQueryKey(elem, transformedKey);
              result[keyType] = result[key][idx];
              idx++;
            });
          delete result[key];
        } else if (Array.isArray(result[key])) {
          let keyType: string = '';
          const arrDate = [];
          (result[key] as [])
            .forEach((elem) => {
              keyType = prepareQueryKey(type[key], transformedKey);
              result[keyType] = elem;
              arrDate.push(elem);
            });
          result[keyType] = arrDate;
          delete result[key];
        } else {
          transformedKey = prepareQueryKey(type[key], transformedKey);
          result[transformedKey] = result[key];
          delete result[key];
        }
      }
    });
  console.log(result);

  return result;
}

function prepareQueryKey(elem: any, transformedKey: any): string {
  debugger;
  switch (elem) {
    case RansackType.Cont: {
      return`q[${transformedKey}_cont]`;
    }

    case RansackType.Gteq: {
      return`q[${transformedKey}_gteq]`;
    }

    case RansackType.Lteq: {
      return `q[${transformedKey}_lteq]`;
    }

    case RansackType.Eq: {
      return`q[${transformedKey}_eq]`;
    }

    case RansackType.In: {
      return `q[${transformedKey}_in][]`;
    }
  }
}


export function prepareMetaForRansack(meta: IMetaData): any {
  debugger;
  let result: IRansackMeta = {};
  let config = {};

  // перетирается
  result = {
    pages: +meta.pages,
    records: +meta.records,
    page: +meta.page,
    limit: +meta.limit,
    title: meta.title,
  };

  if (meta.priceTo && meta.priceFrom) {
    result.price = [meta.priceFrom, meta.priceTo];
    config = {
      title: RansackType.Cont,
      price: [RansackType.Gteq, RansackType.Lteq],
      writingDate: RansackType.Eq,
      releaseDate: RansackType.Eq,
      genres_id: RansackType.In,
    };
  }

  if (!meta.priceTo && meta.priceFrom) {
    result.price = meta.priceFrom;
    config = {
      title: RansackType.Cont,
      price: RansackType.Gteq,
      writingDate: RansackType.Eq,
      releaseDate: RansackType.Eq,
      genres_id: RansackType.In,
    };
  }

  if (meta.priceTo && !meta.priceFrom) {
    result.price = meta.priceTo;
    config = {
      title: RansackType.Cont,
      price: RansackType.Lteq,
      writingDate: RansackType.Eq,
      releaseDate: RansackType.Eq,
      genres_id: RansackType.In,
    };
  }

  if (meta.priceTo === undefined && meta.priceFrom === undefined) {
    config = {
      title: RansackType.Cont,
      writingDate: RansackType.Eq,
      releaseDate: RansackType.Eq,
      genres_id: RansackType.In,
    };
  }

  const arrGen = [];
  if (Array.isArray(meta.genres)) {
    for (const elem of meta.genres) {
      arrGen.push(elem);
    }
    result.genres_id = arrGen;
  } else {
    result.genres_id = meta.genres;
  }

  console.log(result);
  console.log(config);

  return {
    meta: result,
    config,
  };
}

