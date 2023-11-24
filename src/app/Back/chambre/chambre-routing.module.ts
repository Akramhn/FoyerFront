import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChambreComponent } from './list-chambre/list-chambre.component';
import { BackoffComponent } from '../backoff/backoff.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: BackoffComponent,
    children: [{ path: '', component: ListChambreComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChambreRoutingModule {}
