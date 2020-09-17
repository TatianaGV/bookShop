import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  public registrationForm: FormGroup;
  public addressForm: FormGroup;
  public billingForm: FormGroup;

  constructor() {}

  public ngOnInit(): void {
    this.registrationForm = new FormGroup({});
    this.addressForm = new FormGroup({});
    this.billingForm = new FormGroup({});
  }

}
