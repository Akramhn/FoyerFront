import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChambreComponent } from './list-chambre/list-chambre.component';
import { BackoffComponent } from '../backoff/backoff.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddChambreComponent } from './add-chambre/add-chambre.component';
import { UpdateChambreComponent } from './update-chambre/update-chambre.component';

const routes: Routes = [

  {
    path: '',
    component: BackoffComponent,
    children: [{ path: '', component: ListChambreComponent }],
  },

  {
    path: '',
    component: BackoffComponent,
    children: [{ path: 'addChambre', component: AddChambreComponent }],
  },
  {
    path: '',
    component: BackoffComponent,
    children: [{ path: 'editChambre/:id', component: UpdateChambreComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChambreRoutingModule {}
