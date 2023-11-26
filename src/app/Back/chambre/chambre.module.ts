import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChambreRoutingModule } from './chambre-routing.module';
import { ListChambreComponent } from './list-chambre/list-chambre.component';
import { AddChambreComponent } from './add-chambre/add-chambre.component';
import { UpdateChambreComponent } from './update-chambre/update-chambre.component';


@NgModule({
  declarations: [
    ListChambreComponent,
    AddChambreComponent,
    UpdateChambreComponent
  ],
  imports: [
    CommonModule,
    ChambreRoutingModule
  ]
})
export class ChambreModule { }
