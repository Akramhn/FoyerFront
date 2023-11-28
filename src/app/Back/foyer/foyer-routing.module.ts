import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackoffComponent } from '../backoff/backoff.component';
import { ListFoyerComponent } from './list-foyer/list-foyer.component';

const routes: Routes = [
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: '', component: ListFoyerComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
