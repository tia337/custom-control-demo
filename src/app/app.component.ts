import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CustomControl } from './custom-control.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = new FormGroup({
    name: new FormControl<string | null | undefined>(null, Validators.required),
    email: new FormControl<string | null | undefined>(
      null,
      Validators.required
    ),
    customControl: new FormControl<CustomControl | null | undefined>(
      null,
      Validators.required
    ),
  });

  get name(): FormControl {
    return this.form.controls.name;
  }

  get email(): FormControl {
    return this.form.controls.email;
  }

  get customControl(): FormControl {
    return this.form.controls.customControl;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }
  }
}
