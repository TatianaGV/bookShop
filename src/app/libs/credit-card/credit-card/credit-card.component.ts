import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  forwardRef, Output, EventEmitter, ViewChild, ElementRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { debounceTime, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Observable, fromEvent } from 'rxjs';

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

  public masterCard = ['51', '52', '53', '54', '55'];
  public visa = ['4'];

  public logoPicture = '';
  public billingForm: FormGroup;

  @ViewChild('owner', { static: true })
  public owner: ElementRef<HTMLInputElement>;

  @Input()
  public disabled = false;

  @Output()
  public changed = new EventEmitter<ICreditCard>();

  private _destroy$ = new ReplaySubject<any>();

  constructor(
    private _fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this._initForm();
    this._listenForm();
    this._listenNumberInput();
    this._listenOwnerInput();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public writeValue(value: ICreditCard | null): void {
    this.billingForm.patchValue({
      number: value?.number,
      owner: value?.owner,
      valid: value?.valid,
      cvv: value?.valid,
    });
  }

  public onChange = (val: ICreditCard) => {};

  public onTouched = () => {};

  public registerOnChange(fn: (val: ICreditCard | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private _listenOwnerInput(): void {
    const regex = /^[a-zA-Z\s]+$/;
    fromEvent(this.owner.nativeElement, 'keydown')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event: KeyboardEvent) => {
        if (!event.key.match(regex)) {
          event.preventDefault();
        }
      });
  }

  private _onFormChange(): Observable<ICreditCard> {
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
        Validators.minLength(3),
        Validators.maxLength(3),
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
        this.changed.emit(value);
      });
  }

}

