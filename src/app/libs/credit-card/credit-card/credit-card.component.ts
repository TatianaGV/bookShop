import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  forwardRef, Output, EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

import { debounceTime, takeUntil, debounce } from 'rxjs/operators';
import { fromEvent, ReplaySubject, Observable } from 'rxjs';

import { ICreditCard } from '../../../core/interfaces/credit-card.interface';
import { dataCardValidator } from '../../../core/helpers/date-card-validation';

@Component({
  selector: 'app-credit-card',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CreditCardComponent),
    multi: true,
  }],
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements ControlValueAccessor, OnInit, OnDestroy {

  public masterCard = ['5559', '5536', '5213'];
  public visa = ['4276', '4817'];

  public logoPicture = '';
  public billingForm: FormGroup;

  @Input()
  public disabled = false;

  @Output()
  public formChanged = new EventEmitter<ICreditCard>();

  @Input()
  public disabled = false;

  @Output()
  public formChanged = new EventEmitter<ICreditCard>();

  private _destroy$ = new ReplaySubject<any>();

  constructor(
    private _fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this._initForm();
    this._listenForm();
    this._listenNumberInput();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public writeValue(value: any): void {
    if (value) {
      this.billingForm.patchValue({
        number: value.number,
        owner: value.owner,
        valid: value.valid,
        cvv: value.valid,
      });
    }
  }

  public onChange = (val: any) => {};

  public onTouched = () => {};

  public registerOnChange(fn: (val: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public checkInput(e: KeyboardEvent): void {
    const regex = /^[a-zA-Z\s]+$/;
    if (!e.key.match(regex)) {
      e.preventDefault();
    }
  }

  private _onFormChange(): Observable<any> {
    return this.billingForm.valueChanges;
  }

  private _initForm(): void {
    this.billingForm = this._fb.group({
      number: new FormControl(null, [
        Validators.required,
      ]),
      owner: new FormControl(null, [
        Validators.required,
      ]),
      valid: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        dataCardValidator,
      ]),
      cvv: new FormControl(null, [
        Validators.required,
      ]),
    });
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


  private _listenForm(): void {
    this._onFormChange()
      .pipe(
        debounceTime(200),
        takeUntil(this._destroy$),
      )
      .subscribe((value) => {
        this.onChange(value);
        this.formChanged.emit(value);
      });
  }

}

