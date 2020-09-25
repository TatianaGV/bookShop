import { Component, OnInit, Input } from '@angular/core';

import { of } from 'rxjs';

import { IConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss'],
})
export class MyListComponent implements OnInit {

  @Input()
  public config: IConfig;

  constructor() { }

  public ngOnInit(): void {
    this._initConfig();
  }

  private _initConfig(): void {
    this.config = {
      fetch: () => {
        return of([1, 2, 3]);
      },
    };
  }
}
