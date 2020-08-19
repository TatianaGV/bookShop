import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public authPageForm: FormGroup;
  public autofocusPassword = false;

  private _destroy$ = new ReplaySubject<any>(1);

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
  ) { }

  public ngOnInit(): void {
    this._initForm();

    const email = this._activatedRoute.snapshot.queryParamMap.get('email');
    if (email) {
      this.autofocusPassword = true;
      this.authPageForm.patchValue({
        email,
      });
    }
  }

  public submit(): void {
    if (this.authPageForm.invalid) {
      return;
    }
    const user = {
      login: this.authPageForm.value.login,
      password: this.authPageForm.value.password,
    };

    this._authService.login(user)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._router.navigate(['/', 'account']).then();
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
