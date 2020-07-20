import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss'],
})
export class BooksFilterComponent implements OnInit {

  public booksForm: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this.booksForm = new FormGroup({
      title: new FormControl(null, [
      ]),
      genres: new FormControl(null, [
      ]),
      author: new FormControl(null, [
      ]),
      price: new FormControl(null, [
      ]),
      writeData: new FormControl(null, [
      ]),
    });
  }

  public submit(): void {
  }

}
