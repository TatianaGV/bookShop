import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import {
  confirmValidation, patternValidator,
} from '../../core/helpers/password-validation.helpers';
import { IRegistrationUser } from '../../core/interfaces/registration.interface';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public confirmPasswordHide = true;
  public passwordHide = true;
  private _passwordGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _registrationService: RegistrationService,
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

  public submit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const user: IRegistrationUser = {
      first_name: this.registrationForm.value.firstName,
      last_name: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this._passwordGroup.value.password,
      password_confirmation: this._passwordGroup.value.confirmPassword,
    };

    this._registrationService.registrationUser(user);
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
