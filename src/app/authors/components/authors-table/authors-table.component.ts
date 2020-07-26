import { Component } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { IDataAuthors } from '../../../core/interfaces/authors.interface';
import { IMetaData } from '../../../core/interfaces/meta.interface';
import { AuthorsServices } from '../../../core/services/authors.service';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
})
export class AuthorsTableComponent {

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'menu',
  ];

  constructor(
    private _authorsService: AuthorsServices,
  ) { }

  public get allAuthors(): IDataAuthors[] {
    return this._authorsService.allAuthors;
  }

  public get metaData(): IMetaData {
    return this._authorsService.meta;
  }

  public changeStateInPaginator(event: PageEvent): void {
    const meta: IMetaData = {
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };
    this._authorsService.getAllAuthors(meta);
  }

}
