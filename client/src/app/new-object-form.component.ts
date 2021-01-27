import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ObjectService } from './object.service';

import * as models from './models';

@Component({
  selector: 'app-new-object-form',
  template: `
    <form
      [formGroup]="form"
      (submit)="submit()"
      (keydown.control.enter)="submit()"
    >
      <h3>Create New Object</h3>
      <p>
        <mat-form-field appearance="fill">
          <mat-label>Textarea</mat-label>
          <textarea formControlName="value" matInput></textarea>
        </mat-form-field>
      </p>
      <p>
        <button
          [disabled]="form.disabled || form.invalid"
          mat-flat-button
          color="primary"
          type="submit"
        >
          Create
        </button>
      </p>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 0 16px;
      }
    `,
  ],
})
export class NewObjectFormComponent implements OnInit {
  @Output()
  created = new EventEmitter<models.IObject>();

  form = this.fb.group({
    value: ['', Validators.required],
  });

  constructor(public service: ObjectService, public fb: FormBuilder) {}

  ngOnInit(): void {}

  submit(): void {
    if (this.form.valid) {
      const object = this.form.value;
      this.form.disable();
      this.service.create(object).subscribe((obj) => {
        this.created.emit(obj);
        this.form.reset();
        this.form.enable();
      });
    }
  }
}
