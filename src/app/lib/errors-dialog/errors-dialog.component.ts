import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-errors-dialog',
  templateUrl: './errors-dialog.component.html',
  styleUrls: ['./errors-dialog.component.scss'],
})
export class ErrorsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) {}

  public ngOnInit(): void {}

}
