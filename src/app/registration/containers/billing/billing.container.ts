import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing-container',
  templateUrl: './billing.container.html',
  styleUrls: ['./billing.container.scss'],
})
export class BillingContainer implements OnInit {

  @Input()
  public billingForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.billingForm = this._fb.group({
      number: new FormControl(null, [
        Validators.required,
      ]),
      valid: new FormControl(null, [
        Validators.required,
      ]),
      name: new FormControl(null, [
        Validators.required,
      ]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.maxLength(3),
      ]),
    });
  }

}
