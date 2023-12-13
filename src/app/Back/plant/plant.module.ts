import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantRoutingModule } from './plant-routing.module';
import { ListPlantComponent } from './list-plant/list-plant.component';


@NgModule({
  declarations: [
    ListPlantComponent
  ],
  imports: [
    CommonModule,
    PlantRoutingModule
  ]
})
export class PlantModule { }
