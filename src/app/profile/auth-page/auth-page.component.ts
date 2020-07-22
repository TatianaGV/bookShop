import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {

  public authPageForm: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    if (this.authPageForm.invalid) {
      return;
    }

    const user = {
      login: this.authPageForm.value.login,
      password: this.authPageForm.value.password,
    };

    console.log(user);
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
