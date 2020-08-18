import { Component, OnInit } from '@angular/core';

import { AuthorsServices } from '../../services/authors.service';

@Component({
  selector: 'app-authors-main-page',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
  providers: [
    AuthorsServices,
  ],
})
export class AuthorsListComponent implements OnInit {

  constructor() {}

  public ngOnInit(): void {
  }

}
