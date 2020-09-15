import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  public registrationForm: FormGroup = new FormGroup({});
  public addressForm: FormGroup = new FormGroup({});
  public billingInfo: FormGroup = new FormGroup({});

  constructor(
    private _fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.registrationForm = this._fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.addressForm = this._fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.billingInfo = this._fb.group({
      firstCtrl: ['', Validators.required],
    });
  }

}
