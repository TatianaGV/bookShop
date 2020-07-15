import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsListComponent } from './component/authors-list/authors-list.component';
import { AuthorsRoutingModule } from './authors-routing.module';


@NgModule({
  declarations: [
    AuthorsListComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
  ],
})
export class AuthorsModule { }
