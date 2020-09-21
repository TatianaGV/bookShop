import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { IRegistrationUser } from '../../../core/interfaces';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {

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

  constructor() {}

}
