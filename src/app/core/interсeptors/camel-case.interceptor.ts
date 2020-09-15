import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CamelCaseInterceptor implements HttpInterceptor {

  constructor() {
  }

  public intercept(req: HttpRequest<any>,
                   next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event;
          }

          return event;
        }),
      );
  }

}
