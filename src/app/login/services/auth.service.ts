import { Injectable } from '@angular/core';
import { IUserAuth } from '../../core/interfaces/user-auth.interface';
import { BehaviorSubject, Observable } from 'rxjs';

const users: IUserAuth[] = [
  {
    login: 'gulyakina.tv@gmail.com',
    password: '123456',
  },
];

@Injectable()
export class AuthService {

  public isLogin = new BehaviorSubject<boolean>(this._hasToken());

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
        debugger;
        subscriber.error('error auth');
      }
      subscriber.complete();
    });
  }

  public logout() : void {
    localStorage.removeItem('user');
    this.isLogin.next(false);
  }

  public isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
  }

  private _saveUser(login: string) : void {
    localStorage.setItem('user', login);
    this.isLogin.next(true);
  }

  private _hasToken() : boolean {
    return !!localStorage.getItem('user');
  }

}
