import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  public authPageForm: FormGroup;

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    if (this.authPageForm.invalid) {
      return;
    }
    debugger;

    const user = {
      login: this.authPageForm.value.login,
      password: this.authPageForm.value.password,
    };

    this._authService.login(user)
      .subscribe(() => {
        this._router.navigate(['/', 'account']).then();
      });

  }

  private _initForm(): void {
    this.authPageForm = new FormGroup({
      login: new FormControl(null, [
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
