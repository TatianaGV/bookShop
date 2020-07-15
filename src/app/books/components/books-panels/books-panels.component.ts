import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-panels',
  templateUrl: './books-panels.component.html',
  styleUrls: ['./books-panels.component.scss'],
})
export class BooksPanelsComponent implements OnInit {

  public panelOpenState = true;
  public panelTwoOpenState = false;

  constructor() { }

  public ngOnInit(): void {
  }

}
