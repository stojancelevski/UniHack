import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea-material',
  templateUrl: './textarea-material.component.html',
  styleUrls: ['./textarea-material.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaMaterialComponent),
      multi: true
    }
  ]
})
export class TextareaMaterialComponent implements ControlValueAccessor {
  // tslint:disable-next-line:variable-name
  public _value: string;
  public disabled: boolean;

  @Input() keyword: string;
  @Input() type: string;

  constructor() {
  }

  onChange: any = () => {
  };
  onTouch: any = () => {
  };


  registerOnChange(fn: any): void {
    this.onChange =fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  itemChange($event){
    this.onTouch();
    this.onChange($event.currentTarget.value);
  }


}
