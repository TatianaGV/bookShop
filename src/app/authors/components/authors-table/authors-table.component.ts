import { Component, OnInit, Input } from '@angular/core';

import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { AuthorsDataServices, IAuthorsResponse } from '../../../core/data/authors.data';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
})
export class AuthorsTableComponent implements OnInit {

  public meta: IMetaData;

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
  ];

  public dataSource: IDataAuthors[] = [];

  constructor(private _authorsService: AuthorsDataServices) { }

  public ngOnInit(): void {
    this.getAllAuthors();
  }

  public getAllAuthors(): void {
    this._authorsService
      .getAllAuthors(this.meta)
      .subscribe((response: IAuthorsResponse) => {
        this.meta = response.meta;
        this.dataSource = response.authors;
      });
  }

  public changeStateInPaginator(event: PageEvent): void {
    this.meta.page = event.pageIndex + 1;
    this.meta.limit = event.pageSize;
    this.getAllAuthors();
  }

}
