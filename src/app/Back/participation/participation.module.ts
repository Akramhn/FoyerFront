import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipationRoutingModule } from './participation-routing.module';
import { ListParticipationComponent } from './list-participation/list-participation.component';
import { AddParticipationComponent } from './add-participation/add-participation.component';


@NgModule({
  declarations: [
    ListParticipationComponent,
    AddParticipationComponent
  ],
  imports: [
    CommonModule,
    ParticipationRoutingModule
  ]
})
export class ParticipationModule { }
