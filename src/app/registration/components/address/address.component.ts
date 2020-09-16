import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent implements OnInit {

  @Input()
  public addressForm: FormGroup;

  constructor() { }

  public ngOnInit(): void {
  }

  public submit(): void {
    
  }

}
