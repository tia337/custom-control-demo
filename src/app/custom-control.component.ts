import { Component, inject, Injector } from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  NG_VALUE_ACCESSOR,
  Validators,
  FormGroup,
  FormControl,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  AbstractControl,
  NgControl,
} from '@angular/forms';

export interface CustomControl {
  foo: string;
  bar: string;
}

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomControlComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CustomControlComponent,
    },
  ],
})
export class CustomControlComponent implements ControlValueAccessor, Validator {
  private injector = inject(Injector);

  disabled = false;
  ngControl: NgControl;
  form = new FormGroup({
    foo: new FormControl<string | null | undefined>(null, Validators.required),
    bar: new FormControl<string | null | undefined>(null, Validators.required),
  });

  get foo(): FormControl {
    return this.form.controls.foo;
  }

  get bar(): FormControl {
    return this.form.controls.bar;
  }

  private onChange: (value: CustomControl) => void;
  private onTouch: () => void;
  private onValidate: () => void;

  constructor() {}

  ngDoCheck() {
    if (this.ngControl?.touched && !this.form.touched) {
      this.form.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidate = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control && control.value ? null : { required: true };
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(inputValue: CustomControl): void {}
}
