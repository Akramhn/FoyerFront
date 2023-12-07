import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackoffComponent } from '../backoff/backoff.component';
import { ListFoyerComponent } from './list-foyer/list-foyer.component';
import { AddFoyerComponent } from './add-foyer/add-foyer.component';

const routes: Routes = [
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: '', component: ListFoyerComponent }],
  },
  
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: 'addFoyer', component: AddFoyerComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
