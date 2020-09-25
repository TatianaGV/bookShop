import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyListModule } from '../libs/my-list/my-list.module';

import { TableComponent } from './components/table/table.component';
import { TableRoutingModule } from './table-routing.module';

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    MyListModule,
  ],
})
export class TableModule { }
