import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-container',
  templateUrl: './address.container.html',
  styleUrls: ['./address.container.scss'],
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
    this.addressForm.addControl('country', new FormControl(null));
    this.addressForm.addControl('city', new FormControl(null));
    this.addressForm.addControl('street', new FormControl(null));
    this.addressForm.addControl('house', new FormControl(null));
    this.addressForm.addControl('flat', new FormControl(null));
    this.addressForm.addControl('zip', new FormControl(null));
  }

}
