import { Observable } from 'rxjs';

export type FetchFn = () => Observable<any>;

export interface IConfig {
  fetch: FetchFn;
}
