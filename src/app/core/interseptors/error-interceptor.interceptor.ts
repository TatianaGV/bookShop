import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._handleError(error);

          return throwError(error);
        }),
      );
  }

  private _handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 401:
        console.log(401);
        break;
      case 403:
        console.log(403);
        break;
    }
  }

}
