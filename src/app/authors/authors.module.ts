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
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthorsEditPageComponent } from './components/authors-edit-page/authors-edit-page.component';
import { AuthorsFormComponent } from './components/authors-form/authors-form.component';
import { AuthorsConfirmDialogComponent } from './components/authors-confirm-dialog/authors-confirm-dialog.component';
import { SpinnerModule } from '../libs/spinner/spinner.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthorsServices } from './services/authors.service';


@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorsPanelsComponent,
    AuthorsTableComponent,
    AuthorsFilterComponent,
    AuthorsCreatePageComponent,
    AuthorsEditPageComponent,
    AuthorsFormComponent,
    AuthorsConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    SpinnerModule,
  ],
})
export class AuthorsModule { }
