import { Component, OnInit } from '@angular/core';
import { IConfig } from '../../../libs/my-list/interfaces/config.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  public config: IConfig;

  constructor() { }

  public ngOnInit(): void {
  }

}
