import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectPageComponent } from './object-page.component';
import { ObjectListPageComponent } from './object-list-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/objects' },
  { path: 'objects', component: ObjectListPageComponent },
  { path: 'objects/:id', component: ObjectPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
