import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors-panels',
  templateUrl: './authors-panels.component.html',
  styleUrls: ['./authors-panels.component.scss'],
})
export class AuthorsPanelsComponent implements OnInit {

  public panelOpenState = true;
  public panelTwoOpenState = true;

  constructor() { }

  public ngOnInit(): void {
  }

}
