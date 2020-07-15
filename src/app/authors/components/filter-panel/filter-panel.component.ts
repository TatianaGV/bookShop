import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent implements OnInit {

  public panelOpenState = true;

  constructor() { }

  public ngOnInit(): void {
  }

}
