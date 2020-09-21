import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  public generalForm: FormGroup;
  public registrationForm: FormGroup;
  public addressForm: FormGroup;
  public billingForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.registrationForm = new FormGroup({});
    this.addressForm = new FormGroup({});
    this.billingForm = new FormGroup({});

    this.generalForm = this._fb.group({
      registrationForm: this.registrationForm,
      addressForm: this.addressForm,
      billing: this.billingForm,
    });
  }

  public submit(): void {
    console.log(this.generalForm.value);
  }

}
