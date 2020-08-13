import { RansackType } from '../helpers/ransack';

export interface IconfigRansack {
  title?: RansackType.Cont;
  price?: [RansackType.Gteq, RansackType.Lteq] | RansackType.Gteq | RansackType.Lteq;
  writingDate?: RansackType.Eq;
  releaseDate?: RansackType.Eq;
  genres_id?: RansackType.In;
  first_name?: RansackType.Cont;
  last_name?: RansackType.Cont;
}
