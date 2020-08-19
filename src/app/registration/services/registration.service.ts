import { OnDestroy, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { RegistrationDataService } from '../../core/data/registration.data';
import { IRegistrationUser } from '../../core/interfaces/registration.interface';

@Injectable()
export class RegistrationService implements OnDestroy {

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _route: Router,
    private _registrationService: RegistrationDataService,
  ) {
  }

  public registrationUser(user: IRegistrationUser): void {
    this._registrationService
      .registrationUser(user)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._route.navigate(['/', 'login']);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
