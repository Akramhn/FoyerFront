import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipationRoutingModule } from './participation-routing.module';
import { ListParticipationComponent } from './list-participation/list-participation.component';


@NgModule({
  declarations: [
    ListParticipationComponent
  ],
  imports: [
    CommonModule,
    ParticipationRoutingModule
  ]
})
export class ParticipationModule { }
