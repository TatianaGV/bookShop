import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { IRegistrationUser } from '../../../core/interfaces';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {

  @Input()
  public registrationForm: FormGroup;

  @Input()
  public passwordGroupForm: FormGroup;

  @Output()
  public readonly formSubmit = new EventEmitter<IRegistrationUser>();

  constructor() { }

  public get passwordControl(): AbstractControl {
    return this.passwordGroupForm.get('password');
  }

  public get confirmPasswordControl(): AbstractControl {
    return this.passwordGroupForm.get('confirmPassword');
  }

  public submit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const user: IRegistrationUser = {
      first_name: this.registrationForm.value.firstName,
      last_name: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.passwordGroupForm.value.password,
      password_confirmation: this.passwordGroupForm.value.confirmPassword,
    };

    this.formSubmit.emit(user);
  }

}
