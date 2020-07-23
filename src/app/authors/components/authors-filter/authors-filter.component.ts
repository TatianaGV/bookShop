import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authors-filter',
  templateUrl: './authors-filter.component.html',
  styleUrls: ['./authors-filter.component.scss'],
})
export class AuthorsFilterComponent implements OnInit {

  public filterForm: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    if (this.filterForm.invalid) {
      return;
    }
    const author = {
      first_name: this.filterForm.value.firstName,
      last_name: this.filterForm.value.lastName,
    };

    console.log(author);
  }

  private _initForm(): void {
    this.filterForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.minLength(3),
      ]),
    });
  }
}
