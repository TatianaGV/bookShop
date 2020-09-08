import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './books-panels.component.html',
  styleUrls: ['./books-panels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPanelsComponent implements OnInit {

  public panelOpenState = true;
  public panelTwoOpenState = true;

  constructor() { }

  public ngOnInit(): void {
  }

}
