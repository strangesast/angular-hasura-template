import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ObjectService } from './object.service';
import * as models from './models';

@Component({
  selector: 'app-object-list-page',
  template: `
    <header>
      <h1>Objects List</h1>
    </header>
    <app-new-object-form (created)="onCreated($event)"> </app-new-object-form>
    <ng-container *ngIf="service.objects$ | async as objects; else loading">
      <ng-container *ngIf="objects.length; else none">
        <mat-list role="list">
          <mat-list-item role="listitem" *ngFor="let object of objects">
            <a [routerLink]="[object.id]"> {{ object.value }}</a></mat-list-item
          >
        </mat-list>
      </ng-container>
      <ng-template #none>No objects.</ng-template>
    </ng-container>
    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .mat-list .mat-list-item a {
        color: inherit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class ObjectListPageComponent implements OnInit {
  constructor(public service: ObjectService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onCreated(obj: models.IObject): void {
    this.snackBar.open(`Created successfully (${obj.id})`, '', {
      duration: 1000,
    });
  }
}
