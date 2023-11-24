import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChambreRoutingModule } from './chambre-routing.module';
import { ListChambreComponent } from './list-chambre/list-chambre.component';


@NgModule({
  declarations: [
    ListChambreComponent
  ],
  imports: [
    CommonModule,
    ChambreRoutingModule
  ]
})
export class ChambreModule { }
