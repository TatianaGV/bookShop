import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IUserAuth } from '../../../core/interfaces';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  @Input()
  public loginForm: FormGroup;

  @Output()
  public readonly formSubmit = new EventEmitter<IUserAuth>();

  constructor() { }

  public submit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const user: IUserAuth = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.formSubmit.emit(user);
  }

}
