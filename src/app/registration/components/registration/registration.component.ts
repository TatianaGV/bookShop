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
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {

  public get passwordControl(): AbstractControl {
    return this.passwordGroupForm.get('password');
  }

  public get emailControl(): AbstractControl {
    return this.registrationForm.get('email');
  }

  @Input()
  public registrationForm: FormGroup;

  @Input()
  public passwordGroupForm: FormGroup;

  @Output()
  public readonly formSubmit = new EventEmitter<IRegistrationUser>();

  constructor() { }

  public submit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const formValue = this.registrationForm.value;

    const user: IRegistrationUser = {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      password_confirmation: formValue.confirmPassword,
    };

    this.formSubmit.emit(user);
  }

}
