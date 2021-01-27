import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import * as models from './models';

const CREATE_OBJECT = gql`
  mutation($object: objects_insert_input!) {
    insert_objects_one(object: $object) {
      id
      value
    }
  }
`;

const GET_OBJECTS = gql`
  subscription {
    objects(limit: 10, order_by: { id: desc }) {
      id
      value
    }
  }
`;

const GET_OBJECT = gql`
  query($id: Int!) {
    objects_by_pk(id: $id) {
      id
      value
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  query$ = this.apollo
    .subscribe<any>({ query: GET_OBJECTS })
    .pipe(shareReplay(1)) as Observable<any>;

  loading$ = this.query$.pipe(pluck('loading'), distinctUntilChanged());

  objects$ = this.query$.pipe(pluck('data', 'objects'));

  constructor(public apollo: Apollo) {}

  create(object: models.IObject): Observable<any> {
    return this.apollo
      .mutate({ mutation: CREATE_OBJECT, variables: { object } })
      .pipe(pluck<any, models.IObject>('data', 'insert_objects_one'));
  }

  get(id: string): Observable<any> {
    return this.apollo.query({ query: GET_OBJECT, variables: { id } });
  }
}
