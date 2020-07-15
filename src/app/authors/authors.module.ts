import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';

import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AuthorsListComponent,
    FilterPanelComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatExpansionModule,
    MatIconModule,
  ],
})
export class AuthorsModule { }
