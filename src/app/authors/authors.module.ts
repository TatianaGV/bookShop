import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsPanelsComponent } from './components/authors-panels/authors-panels.component';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthorsFilterComponent } from './components/authors-filter/authors-filter.component';
import { AuthorsCreatePageComponent } from './components/authors-create-page/authors-create-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorsPanelsComponent,
    AuthorsTableComponent,
    AuthorsFilterComponent,
    AuthorsCreatePageComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class AuthorsModule { }
