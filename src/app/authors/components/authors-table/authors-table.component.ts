import { Component, OnInit } from '@angular/core';

import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { AuthorsDataServices, IAuthorsResponse } from '../../../core/data/authors.data';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
})
export class AuthorsTableComponent implements OnInit {

  public displayedColumns: string[] =
    ['id', 'firstName', 'lastName'];

  public dataSource: IDataAuthors[] = [];

  constructor(private _authorsService: AuthorsDataServices) { }

  public ngOnInit(): void {
    this.getAllAuthors();
  }

  public getAllAuthors(): void {
    this._authorsService
      .getAllAuthors()
      .subscribe((response: IAuthorsResponse) => {
        this.dataSource = response.authors;
      });
  }

}
