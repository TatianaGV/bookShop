import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { RegistrationService } from '../../services/registration.service';
import { IRegistrationUser } from '../../../core/interfaces';

@Component({
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  public generalForm: FormGroup;
  public registrationForm: FormGroup;
  public addressForm: FormGroup;
  public billingForm: FormGroup;
  public billingControl: FormControl;

  constructor(
    private _fb: FormBuilder,
    private _registrationService: RegistrationService,
  ) {}

  public ngOnInit(): void {
    this.registrationForm = new FormGroup({});
    this.addressForm = new FormGroup({});
    this.billingForm = new FormGroup({});
    this.billingControl = new FormControl();

    this.generalForm = this._fb.group({
      registrationForm: this.registrationForm,
      addressForm: this.addressForm,
      billingForm: this.billingControl,
    });

    this.billingControl.valueChanges
      .subscribe((value) => {
        console.log(value);
      });
  }

  public submit(): void {
    debugger;
    const formValue = this.registrationForm.value;
    const user: IRegistrationUser = {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      password: formValue.password.password,
      password_confirmation: formValue.password.confirmPassword,
    };
    if (this.registrationForm.valid && this.addressForm.valid && this.billingControl.valid) {
      this._registrationUser(user);
    }
  }

  private _registrationUser(user: IRegistrationUser): void {
    this._registrationService
      .registrationUser(user);
  }

}
