import { Component, OnInit } from '@angular/core';

import { AuthorsDataServices } from '../../../core/data/authors.data';

@Component({
  selector: 'app-authors-main-page',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
})
export class AuthorsListComponent implements OnInit {

  constructor(private _authorsServices: AuthorsDataServices) { }

  public ngOnInit(): void {
    const data = this._authorsServices
      .getAllAuthors()
      .subscribe((resp) => {
        console.log(resp);
      });
  }

}
