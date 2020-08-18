import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../login/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this._authService.isLoggedIn()
      .pipe(
        map((param) => {
          if (param) {
            return true;
          } else {
            return this._router.createUrlTree(['/login']);
          }
        }),
      );
  }

}
