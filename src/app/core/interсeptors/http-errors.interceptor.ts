import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { throwError, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { ErrorsDialogComponent } from '../../libs/errors-dialog/errors-dialog.component';
import { IDialogData } from '../interfaces/errors-dialog.interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public data: IDialogData;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
  ) {}

  public intercept(req: HttpRequest<any>,
                   next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._handleError(error);

          return throwError(error);
        }),
      );
  }

  private _handleError(error: HttpErrorResponse): void {
    const data: IDialogData = {
      title: error.status.toString(),
      message: error.statusText,
    };
    switch (error.status) {
      case 401:
      case 403:
      case 404:
        this._openDialog(data);
        break;
    }
  }

  private _openDialog(data: IDialogData): void {
    const dialogRef = this._dialog.open(ErrorsDialogComponent, {
      width: '350px',
      data,
    });

    dialogRef.afterClosed()
      .pipe(
        take(1),
      )
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

}
