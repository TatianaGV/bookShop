import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { IDataAuthors } from '../interfaces/authors.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsDataServices {

  constructor(private http: HttpClient) {
  }

  public getAllAuthors(): Observable<IDataAuthors[]> {
    return this.http
      .get(`${environment.apiUrl}/authors`)
      .pipe(map((resp: any) => {
        return {
          ...resp,
        };
      }),
      );
  }

}
