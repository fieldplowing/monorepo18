import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import { NaviComponent } from './navi/navi.component';
import { ListComponent } from './list/list.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: NaviComponent,
    children: [
      { path: '', component: TaskComponent },
      { path: 'detail', component: TaskdetailComponent },
    ],
  },
  // { path: '', component: TaskComponent },
  // { path: 'detail', component: TaskdetailComponent },
  // { path: 'detail', component: TaskdetailComponent },
  // { path: 'first', component: ListComponent },
  { path: 'second', component: ListComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
];
