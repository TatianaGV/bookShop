import { Component, OnInit } from '@angular/core';

import { IDataAuthors } from '../../../core/interfaces/authors.interface';

const DATA_AUTHORS: IDataAuthors[] = [
  { id: 1,
    firstName: 'Korey',
    lastName: 'McKenzie',
  },
  {
    id: 2,
    firstName: 'Joseph',
    lastName: 'Mayert',
  },
];

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
})
export class AuthorsTableComponent implements OnInit {

  public displayedColumns: string[] =
    ['id', 'firstName', 'lastName'];

  public dataSource = DATA_AUTHORS;

  constructor() { }

  public ngOnInit(): void {
  }

}
