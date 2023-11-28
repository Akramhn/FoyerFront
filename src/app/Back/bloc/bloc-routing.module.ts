import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackoffComponent } from '../backoff/backoff.component';
import { ListBlocBackComponent } from './list-bloc-back/list-bloc-back.component';
import { AddBlocBackComponent } from './add-bloc-back/add-bloc-back.component';

const routes: Routes = [
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: '', component: ListBlocBackComponent }],
  },
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: 'addBloc', component: AddBlocBackComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocRoutingModule { }
