import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';


@Injectable()
export class UrlReplaceInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>,
                   next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    debugger;
    req = req.clone({
      url: environment.apiUrl + req.url,
    });

    return next.handle(req);
  }

}
