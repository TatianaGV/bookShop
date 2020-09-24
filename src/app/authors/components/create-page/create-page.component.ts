import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IDataAuthor } from '../../../core/interfaces';
import { AuthorsServices } from '../../services/authors.service';

@Component({
  selector: 'app-authors-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class AuthorsCreatePageComponent implements OnInit {

  public authorForm: FormGroup;

  private _regExName = '^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$';

  constructor(
    private _authorService: AuthorsServices,
    private _route: Router,
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    if (this.authorForm.invalid) {
      return;
    }
    const author = {
      id: null,
      first_name: this.authorForm.value.firstName,
      last_name: this.authorForm.value.lastName,
    };
    this.createAuthor(author);
    this._route
      .navigate(['/authors']);
  }

  public createAuthor(author : IDataAuthor): void {
    this._authorService
      .createAuthor(author);
  }

  private _initForm(): void {
    this.authorForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(256),
        Validators.pattern(this._regExName),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(256),
        Validators.pattern(this._regExName),
      ]),
    });
  }

}
