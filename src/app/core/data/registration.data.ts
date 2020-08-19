import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IRegistrationUser } from '../interfaces/registration.interface';

@Injectable({
  providedIn: 'root',
})
export class RegistrationDataService {

  constructor(
    private _http: HttpClient,
  ) {}

  public registrationUser(user: IRegistrationUser): Observable<IRegistrationUser> {
    return this._http
      .post<IRegistrationUser>(
        '/registration',
        user,
      );
  }

}
