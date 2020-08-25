import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDialogData } from '../../core/interfaces';

@Component({
  selector: 'app-errors-dialog',
  templateUrl: './errors-dialog.component.html',
  styleUrls: ['./errors-dialog.component.scss'],
})
export class ErrorsDialogComponent implements OnInit {

  public dialogData: IDialogData;

  constructor(
    public dialogRef: MatDialogRef<ErrorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
    this.dialogData = data;
  }

  public ngOnInit(): void {}

}
