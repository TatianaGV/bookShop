import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../../login/services/auth.service';
import { map } from 'rxjs/operators';

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
    console.log('canActivate');
    debugger;

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
