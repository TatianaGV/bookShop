import { snakeCase } from 'lodash-es';
import { IDataGenre } from '../interfaces/genres.interface';

export enum RansackType {
  Cont ,
  Gteq ,
  Lteq ,
  Eq ,
  In,
}

export function toRansack(obj: any, type: { [key: string]: RansackType | RansackType[] }): any {
  const result = { ...obj };
  Object.keys(type)
    .forEach((key) => {
      if (result[key]) {
        let transformedKey = snakeCase(key);
        if (transformedKey === 'price_to' || transformedKey === 'price_from') {
          transformedKey = 'price';
        }
        debugger;
        if (transformedKey === 'genres') {
          transformedKey = 'genres_id';
          // if (Array.isArray(result[key])) {
          //   (result[key] as [])
          //     .forEach((elem) => {
          //       transformedKey = prepareQueryKey(elem, transformedKey);
          //       result[transformedKey] = result[key].id;
          //     });
          // }
        }
        if (Array.isArray(type[key])) {
          (type[key] as [])
            .forEach((elem) => {
              transformedKey = prepareQueryKey(elem, transformedKey);
              result[transformedKey] = result[key];
            });
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
