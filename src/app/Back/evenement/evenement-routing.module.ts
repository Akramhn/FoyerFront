import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackoffComponent } from '../backoff/backoff.component';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';
import { AddEvenementComponent } from './add-evenement/add-evenement.component';
import { UpdateEvenementComponent } from './update-evenement/update-evenement.component';

const routes: Routes = [
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: '', component: ListEvenementComponent }],
  },

  {
    path: '',
    component: BackoffComponent,
    children: [{ path: 'addEvent', component: AddEvenementComponent }],

  },
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: 'updateEvent/:id', component: UpdateEvenementComponent }],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvenementRoutingModule { }
