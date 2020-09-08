import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
  }

}
