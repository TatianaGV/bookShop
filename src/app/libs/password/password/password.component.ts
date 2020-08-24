import { Component, OnInit, Self, Optional, Input, OnDestroy, DoCheck } from '@angular/core';
import {
  NgControl,
  AbstractControl,
  FormControl,
  ControlValueAccessor,
  FormGroupDirective, NgForm
} from '@angular/forms';

import { MatFormFieldControl } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: PasswordComponent,
  }],
})
export class PasswordComponent implements OnInit,
  MatFormFieldControl<PasswordComponent>, ControlValueAccessor, DoCheck {

  public passwordHide = true;
  public inputControl: AbstractControl = new FormControl('');
  public value: PasswordComponent;
  public stateChanges = new Subject<void>();
  public id: string;
  public focused: boolean;
  public empty: boolean;
  public shouldLabelFloat: boolean;
  public required: boolean;
  public disabled: boolean;
  public errorState: boolean;
  public controlType?: string;
  public autofilled?: boolean;
  private _placeholder: string;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _defaultErrorStateMatcher: ErrorStateMatcher,
    private _parentFormGroup: FormGroupDirective,
    @Optional() private _parentForm: NgForm,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  public setDescribedByIds(ids: string[]): void {}

  public onContainerClick(event: MouseEvent): void {}

  public ngOnInit(): void {
    const validators = this.ngControl.control.validator;
    this.inputControl = this.ngControl.control;
    this.inputControl.setValidators(validators ? validators : null);
    this.inputControl.updateValueAndValidity();
  }

  public ngDoCheck(): void {
    if (this.ngControl) {
      this._updateErrorState();
    }
  }

  public writeValue(val: any): void {
    this.inputControl.setValue(val);
  }

  public onChanged = (val: any) => {};

  public onTouched = () => {};

  public registerOnChange(fn: (val: any) => void): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(): void {}

  private _updateErrorState(): void {
    const oldState = this.errorState;
    const parent = this._parentFormGroup || this._parentForm;
    const control = this.ngControl ? this.ngControl.control as FormControl : null;
    const newState = this._defaultErrorStateMatcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }
}
