import { Component, OnInit } from '@angular/core';

import { IConfig } from '../../../libs/my-list/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  public config: IConfig;
  public name: string;
  public title: string;

  constructor() { }

  public ngOnInit(): void {
  }

}
