import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyListComponent } from './components/my-list/my-list.component';
import { MyListColumnDirective } from './directives/my-list-column.directive';


@NgModule({
  declarations: [
    MyListComponent,
    MyListColumnDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MyListComponent,
    MyListColumnDirective,
  ],
})
export class MyListModule { }
