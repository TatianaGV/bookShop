import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { AuthorsDataServices } from '../../../core/data/authors.data';

@Component({
  selector: 'app-authors-create-page',
  templateUrl: './authors-create-page.component.html',
  styleUrls: ['./authors-create-page.component.scss'],
})
export class AuthorsCreatePageComponent implements OnInit {

  public authorForm: FormGroup;

  constructor(
    private _authorService: AuthorsDataServices,
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
    this.saveItemAuthor(author);
  }

  public saveItemAuthor(item : IDataAuthors): void {
    this._authorService
      .saveItemAuthor(item)
      .subscribe((response) => {
        console.log(response);
      });
  }

  private _initForm(): void {
    this.authorForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

}
