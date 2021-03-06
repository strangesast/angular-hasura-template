import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from '@apollo/client/core';
import { shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { Observer, Observable } from 'rxjs';

export class SubscriptionClientConnectionChanges extends Observable<string> {}

@NgModule({
  imports: [],
  providers: [
    {
      provide: SubscriptionClient,
      useFactory: () => {
        const { protocol, host } = window.location;
        const authToken = localStorage.getItem('token');
        const uri = `${
          protocol === 'https:' ? 'wss:' : 'ws:'
        }//${host}/v1/graphql`;
        const client = new SubscriptionClient(uri, {
          reconnect: true,
          connectionParams: { authToken },
        });
        return client;
      },
    },
    {
      provide: SubscriptionClientConnectionChanges,
      useFactory: (client: SubscriptionClient) => {
        const EVENT_TYPES = [
          'connected',
          'connecting',
          'disconnected',
          'reconnecting',
          'reconnected',
        ];
        const o: Observable<string> = Observable.create(
          (observer: Observer<string>) => {
            for (const eventName of EVENT_TYPES) {
              client.on(eventName, () => observer.next(eventName));
            }
          }
        );
        return o.pipe(distinctUntilChanged(), shareReplay(1));
      },
      deps: [SubscriptionClient],
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (client: SubscriptionClient) => {
        const cache = new InMemoryCache();
        const link = new WebSocketLink(client);
        return { cache, link };
      },
      deps: [SubscriptionClient],
    },
  ],
})
export class GraphQLModule {}
