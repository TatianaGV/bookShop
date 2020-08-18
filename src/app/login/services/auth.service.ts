import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IUserAuth } from '../../core/interfaces/user-auth.interface';

const users: IUserAuth[] = [
  {
    login: 'gulyakina.tv@gmail.com',
    password: '123456',
  },
];

@Injectable()
export class AuthService {

  private _isLogin$ = new BehaviorSubject<boolean>(this._hasToken());

  constructor() {}

  public login(user: IUserAuth): Observable<any> {
    return new Observable<any>((subscriber) => {
      const res = users
        .find((userCredo: IUserAuth) => (userCredo.login === user.login
          && userCredo.password === user.password));
      if (res) {
        this._saveUser(user.login);
        subscriber.next();
      } else {
        subscriber.error('error auth');
      }
      subscriber.complete();
    });
  }

  public logout() : void {
    localStorage.removeItem('user');
    this._isLogin$.next(false);
  }

  public isLoggedIn() : Observable<boolean> {
    return this._isLogin$.asObservable();
  }

  private _saveUser(login: string) : void {
    localStorage.setItem('user', login);
    this._isLogin$.next(true);
  }

  private _hasToken() : boolean {
    return !!localStorage.getItem('user');
  }

}
