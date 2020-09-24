import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors-panels',
  templateUrl: './authors-panels.view.html',
  styleUrls: ['./authors-panels.view.scss'],
})
export class AuthorsPanelsComponent implements OnInit {

  public panelOpenState = true;
  public panelTwoOpenState = true;

  constructor() { }

  public ngOnInit(): void {
  }

}
