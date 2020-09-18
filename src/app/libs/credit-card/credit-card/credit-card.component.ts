import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {

  public masterCard = ['5559', '5536', '5213'];
  public visa = ['4276', '4817'];

  public logoPicture = '';

  // @ViewChild('cardNumber')
  // public cardNumber: ElementRef<HTMLInputElement>;

  @Input()
  public billingForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) {
    this._initForm();
    this._listenInputNumber();
  }

  public ngOnInit(): void {
  }

  private _initForm(): void {
    this.billingForm = this._fb.group({
      number: new FormControl(null, [
        Validators.maxLength(16),
      ]),
      owner: new FormControl(null, []),
      valid: new FormControl(null, []),
      cvv: new FormControl(null, [
        Validators.maxLength(3),
      ]),
    });
  }

  private _listenInputNumber(): void {
    this.billingForm
      .get('number')
      .valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe((resp) => {
        if (this.masterCard.indexOf(resp) !== -1) {
          this.logoPicture = 'assets/pic/mastercard_logo.svg';
        } else {
          if (this.visa.indexOf(resp) !== -1) {
            this.logoPicture = 'assets/pic/visa.svg';
          }
        }
        if (!resp) {
          this.logoPicture = '';
        }
      });
  }

}

