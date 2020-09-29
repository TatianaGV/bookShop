import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ViewChildren,
  AfterViewInit, ContentChildren
} from '@angular/core';

import { of } from 'rxjs';

import { IConfig } from '../../interfaces';
import { MyListColumnDirective } from '../../directives/my-list-column.directive';

@Component({
  selector: 'my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss'],
})
export class MyListComponent implements OnInit, AfterViewInit {

  @ContentChildren(MyListColumnDirective, { read: ElementRef })
  public columns;

  @Input()
  public config: IConfig;

  constructor() { }

  public ngOnInit(): void {
    this._initConfig();
  }

  public ngAfterViewInit(): void {
    debugger;
    console.log('columns', this.columns);
  }

  private _initConfig(): void {
    this.config = {
      fetch: () => {
        return of([1, 2, 3]);
      },
    };
  }

}
