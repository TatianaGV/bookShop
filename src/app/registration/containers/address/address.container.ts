import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-container',
  templateUrl: './address.container.html',
  styleUrls: ['./address.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressContainer implements OnInit {

  @Input()
  public addressForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.addressForm = this._fb.group({
      country: new FormControl(null, [
        Validators.required,
      ]),
      city: new FormControl(null, [
        Validators.required,
      ]),
      street: new FormControl(null, [
        Validators.required,
      ]),
      house: new FormControl(null, [
        Validators.required,
      ]),
      flat: new FormControl(null, [
        Validators.required,
      ]),
      zip: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

}
