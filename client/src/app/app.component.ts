import { Component } from '@angular/core';
import { SubscriptionClientConnectionChanges } from './graphql.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concat } from 'rxjs';
import { tap, debounceTime, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host,
      .container {
        display: block;
        overflow: hidden;
      }
    `,
  ],
})
export class AppComponent {
  constructor(
    public changes: SubscriptionClientConnectionChanges,
    snackBar: MatSnackBar
  ) {
    concat(
      // wait for initial connection status
      changes.pipe(
        takeWhile((e: string) => !(e === 'connected' || e === 'reconnected')),
        debounceTime(1000),
        tap(() => snackBar.open(`Unable to connect to data api.`))
      ),
      // update on subsquent changes
      changes.pipe(
        tap((e) => {
          const message = e[0].toUpperCase() + e.substr(1);
          if (e === 'connected') {
            // dont display a message for expected behavior
            snackBar.dismiss();
          } else if (e === 'disconnected') {
            snackBar.open(message, 'dismiss');
          } else {
            snackBar.open(message, undefined, { duration: 1000 });
          }
        })
      )
    ).subscribe();
  }
}
