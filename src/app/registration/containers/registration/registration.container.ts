import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {
  confirmValidation,
  patternValidator,
} from '../../../core/helpers/password-validation.helpers';
import { IRegistrationUser } from '../../../core/interfaces';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.container.html',
  styleUrls: ['./registration.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationContainer {

  public registrationForm: FormGroup;

  public passwordGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _registrationService: RegistrationService,
  ) {
    this._initForm();
  }

  public formSubmit(user: IRegistrationUser): void {
    this._registrationService.registrationUser(user);
  }

  private _initForm(): void {
    this.passwordGroup = this._fb.group({
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
      password: this.passwordGroup,
    });
  }

}
