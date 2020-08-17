import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorsDataServices } from '../../core/data/authors.data';

@Injectable({
  providedIn: 'root',
})
export class AuthorsResolver implements Resolve<any> {

  constructor(
    private _authorServices: AuthorsDataServices,
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    return this._authorServices.getAllAuthors();
  }

}
