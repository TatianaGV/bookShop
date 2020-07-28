import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthorsServices } from '../../../core/services/authors.service';
import { IDataAuthor } from '../../../core/interfaces/authors.interface';

@Component({
  selector: 'app-authors-edit-page',
  templateUrl: './authors-edit-page.component.html',
  styleUrls: ['./authors-edit-page.component.scss'],
})
export class AuthorsEditPageComponent implements OnInit {

  public authorForm: FormGroup;

  constructor(
    private _authorService: AuthorsServices,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) { }

  public ngOnInit(): void {
    this.authorForm = new FormGroup({});
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this._authorService
      .getAuthorById(+id);
  }

  public get author(): IDataAuthor {
    return this._authorService
      .author;
  }

  public updateAuthor(author: IDataAuthor): void {
    this._authorService
      .updateAuthorById(author);
  }

  public submit(): void {
    if (this.authorForm.invalid) {
      return;
    }
    const author = {
      id: this.author.id,
      first_name: this.authorForm.value.firstName,
      last_name: this.authorForm.value.lastName,
    };
    this.updateAuthor(author);
    this._route
      .navigate(['/authors']);
  }

  public reset(): void {
    this.authorForm.reset({
      id: this.author.id,
      firstName: this.author.first_name,
      lastName: this.author.last_name,
    });
  }

  public clear(): void {
    this.authorForm.reset();
  }

}
