import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IDataAuthors } from '../../../core/interfaces/authors.interface';

@Component({
  selector: 'app-authors-create-page',
  templateUrl: './authors-create-page.component.html',
  styleUrls: ['./authors-create-page.component.scss'],
})
export class AuthorsCreatePageComponent implements OnInit {

  public authorForm: FormGroup;

  public author: IDataAuthors;

  constructor() { }

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    if (this.authorForm.invalid) {
      return;
    }
    this.author = {
      id: 3,
      first_name: this.authorForm.value.firstName,
      last_name: this.authorForm.value.lastName,
    };
  }

  private _initForm(): void {
    this.authorForm = new FormGroup({
      firstName: new FormControl(null, [
      ]),
      lastName: new FormControl(null, [
      ]),
    });
  }

}
