import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDataAuthor } from '../../../core/interfaces';

@Component({
  selector: 'app-authors-form',
  templateUrl: './authors-form.component.html',
  styleUrls: ['./authors-form.component.scss'],
})
export class AuthorsFormComponent implements OnInit {

  @Input()
  public authorForm: FormGroup;

  @Input()
  public set author(author: IDataAuthor) {
    if (author) {
      this.authorForm.patchValue({
        id: author.id,
        firstName: author.first_name,
        lastName: author.last_name,
      });
    }
  }

  private _regExName = '^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$';

  constructor() { }

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.authorForm.addControl('firstName', new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(256),
      Validators.pattern(this._regExName),
    ]));

    this.authorForm.addControl('lastName', new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(256),
      Validators.pattern(this._regExName),
    ]));
  }

}
