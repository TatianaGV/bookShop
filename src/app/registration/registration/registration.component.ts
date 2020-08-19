import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import {
  confirmValidation, patternValidator,
} from '../../core/helpers/password-validation.helpers';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public passwordHide = true;
  public confirmPasswordHide = true;

  private _passwordGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  public get passwordControl(): AbstractControl {
    return this._passwordGroup.get('password');
  }

  public get confirmPasswordControl(): AbstractControl {
    return this._passwordGroup.get('confirmPassword');
  }

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this._passwordGroup = this._fb.group({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        patternValidator(/\d/, { hasNumber: true }),
        patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        patternValidator(/[a-z]/, { hasSmallCase: true }),
        patternValidator(/[@*#!?$%]/, { hasSpecialSymbol: true }),
      ]),
      confirmPassword: new FormControl(null, []),
    }, {
      validator: confirmValidation('password', 'confirmPassword'),
    });

    this.registrationForm = this._fb.group({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: this._passwordGroup,
    });
  }

}
