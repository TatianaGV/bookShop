import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
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
})
export class RegistrationContainer implements OnInit, OnChanges {


  @Input()
  public registrationForm: FormGroup;

  public passwordGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _registrationService: RegistrationService,
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this._initForm();
    }
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
      confirmPassword: new FormControl('', []),
    }, {
      validator: confirmValidation('password', 'confirmPassword'),
    });


    this.registrationForm.addControl('firstName', new FormControl(null));
    this.registrationForm.addControl('lastName', new FormControl(null));
    this.registrationForm.addControl('email', new FormControl(null));
    this.registrationForm.addControl('password', this.passwordGroup);
  }

}
