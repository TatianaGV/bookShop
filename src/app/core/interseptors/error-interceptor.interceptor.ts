import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { throwError, Observable, ReplaySubject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorsDialogComponent } from '../../lib/errors-dialog/errors-dialog.component';
import { IDialogData } from '../interfaces/errors-dialog.interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor, OnDestroy {

  public data: IDialogData;

  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _router: Router,
    public dialog: MatDialog,
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

  public openDialog(data: IDialogData): void {
    const dialogRef = this.dialog.open(ErrorsDialogComponent, {
      width: '350px',
      data,
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

  public ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }

  private _handleError(error: HttpErrorResponse): void {
    const data: IDialogData = {
      title: error.status.toString(),
      message: error.statusText,
    };
    switch (error.status) {
      case 401:
        this.openDialog(data);
        break;
      case 404:
        this.openDialog(data);
        break;
      case 403:
        this.openDialog(data);
        break;
    }
  }

}
