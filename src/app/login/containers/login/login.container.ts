import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { IUserAuth } from '../../../core/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainer implements OnDestroy {

  @Input()
  public set email(value: string) {
    this.authPageForm
      .patchValue({
        email: value,
      });
  }

  @Output()
  public readonly loggedIn = new EventEmitter<void>();

  public authPageForm: FormGroup;

  private _destroy$ = new ReplaySubject<any>(1);

  constructor(
    private _authService: AuthService,
  ) {
    this._initForm();
  }

  public formSubmit(user: IUserAuth): void {
    this._authService.login(user)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.loggedIn.emit();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _initForm(): void {
    this.authPageForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

}
