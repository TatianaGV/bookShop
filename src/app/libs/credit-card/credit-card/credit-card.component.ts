import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { debounceTime, takeUntil } from 'rxjs/operators';
import { fromEvent, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit, OnDestroy {

  public masterCard = ['5559', '5536', '5213'];
  public visa = ['4276', '4817'];

  public logoPicture = '';

  @ViewChild('owner', { static: true })
  public owner: ElementRef<HTMLInputElement>;

  @Input()
  public billingForm: FormGroup;

  private _destroy$ = new ReplaySubject<any>();
  private _reOwner = /^[a-zA-Z\s]+$/;

  constructor(
    private _fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this._initForm();
    this._listenOwnerInput();
    this._listenNumberInput();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initForm(): void {
    this.billingForm.addControl('number', new FormControl(null));
    this.billingForm.addControl('owner', new FormControl(null));
    this.billingForm.addControl('valid', new FormControl(null));
    this.billingForm.addControl('cvv', new FormControl(null));
  }

  private _listenNumberInput(): void {
    this.billingForm?.get('number')
      .valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy$),
      )
      .subscribe((resp) => {
        if (!resp) {
          this.logoPicture = '';
        } else if (this.masterCard.indexOf(resp) !== -1) {
          this.logoPicture = 'assets/pic/mastercard_logo.svg';
        } else {
          if (this.visa.indexOf(resp) !== -1) {
            this.logoPicture = 'assets/pic/visa.svg';
          }
        }
      });
  }

  private _listenOwnerInput(): void {
    fromEvent(this.owner.nativeElement, 'keydown')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event: KeyboardEvent) => {
        if (!event.key.match(this._reOwner)) {
          event.preventDefault();
        }
      });
  }

}

