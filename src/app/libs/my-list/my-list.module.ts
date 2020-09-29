import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyListComponent } from './components/table/my-list.component';
import { MyListColumnDirective } from './directives/my-list-column.directive';
import { MyListCellDirective } from './directives/my-list-cell.directive';


@NgModule({
  declarations: [
    MyListComponent,
    MyListColumnDirective,
    MyListCellDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MyListComponent,
    MyListColumnDirective,
    MyListCellDirective,
  ],
})
export class MyListModule { }
