interface IBookParent {
  page?: number;
  limit?: number;
  title?: string;
  priceFrom?: number;
  priceTo?: number;
  genres?: number[];
}

export interface IBookFilter extends IBookParent {
  writingDate?: Date;
  releaseDate?: Date;
}

export interface IBookFilterUrlParams extends IBookParent {
  writingDate?: string;
  releaseDate?: string;
}
