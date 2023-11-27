import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackoffComponent } from '../backoff/backoff.component';
import { ListBlocBackComponent } from './list-bloc-back/list-bloc-back.component';

const routes: Routes = [
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: '', component: ListBlocBackComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocRoutingModule { }
