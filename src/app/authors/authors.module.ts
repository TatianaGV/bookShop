import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerModule } from '../libs/spinner/spinner.module';

import { AuthorsEditPageComponent } from './components/edit-page/authors-edit-page.component';
import { AuthorsFormComponent } from './components/authors-form/authors-form.component';
import { AuthorsConfirmDialogComponent } from './components/authors-confirm-dialog/authors-confirm-dialog.component';
import { AuthorsFilterComponent } from './components/authors-filter/authors-filter.component';
import { AuthorsCreatePageComponent } from './components/create-page/authors-create-page.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsPanelsComponent } from './view/panel/authors-panels.view';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { AuthorsServices } from './services/authors.service';
import { EditPageView } from './view/edit-page/edit-page.view';
import { CreatePageView } from './view/create-page/create-page.view';
import { CreatePageContainer } from './container/create-page/create-page.container';
import { EditPageContainer } from './container/edit-page/edit-page.container';


@NgModule({
  declarations: [
    AuthorsPanelsComponent,
    AuthorsTableComponent,
    AuthorsFilterComponent,
    AuthorsCreatePageComponent,
    AuthorsEditPageComponent,
    AuthorsFormComponent,
    AuthorsConfirmDialogComponent,
    EditPageView,
    CreatePageView,
    CreatePageContainer,
    EditPageContainer,
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
  providers: [
    AuthorsServices,
  ],
})
export class AuthorsModule { }
