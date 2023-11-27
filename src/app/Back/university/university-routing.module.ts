import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackoffComponent } from '../backoff/backoff.component';
import { ListUniversityComponent } from './list-university/list-university.component';

const routes: Routes = [
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: '', component: ListUniversityComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversityRoutingModule { }
