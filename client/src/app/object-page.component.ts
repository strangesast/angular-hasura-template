import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay, pluck } from 'rxjs/operators';

import { ObjectService } from './object.service';

@Component({
  selector: 'app-object-page',
  template: `
    <ng-container *ngIf="query$ | async as query">
      <ng-container *ngIf="!query.loading; else loading">
        <ng-container *ngIf="query.object; else notfound">
          <header>
            <h1>
              <a [routerLink]="['/objects']">Objects</a> / {{ query.object.id }}
            </h1>
          </header>
          <p>{{ query.object.value }}</p>
        </ng-container>
        <ng-template #notfound>
          <header>
            <h1>Not found...</h1>
          </header>
        </ng-template>
      </ng-container>
      <ng-template #loading>Loading...</ng-template>
    </ng-container>
  `,
  styles: [
    `
      h1 a {
        color: inherit;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      :host {
        display: block;
        height: 100%;
      }
      :host p {
        display: block;
        padding: 0 16px;
        word-wrap: break-word;
      }
    `,
  ],
})
export class ObjectPageComponent implements OnInit {
  query$ = this.route.params.pipe(
    pluck('id'),
    switchMap((id) => this.service.get(id)),
    shareReplay(1),
    map(({ loading, data }: any) => ({ loading, object: data.objects_by_pk }))
  );

  constructor(public route: ActivatedRoute, public service: ObjectService) {}

  ngOnInit(): void {}
}
