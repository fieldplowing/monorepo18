import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
export const routes: Routes = [
  { path: 'first', component: ListComponent },
  { path: '', redirectTo: '/first', pathMatch: 'full' }, // redirect to `first-component`
];
