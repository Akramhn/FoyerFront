import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachRoutingModule } from './coach-routing.module';
import { ListCoachComponent } from './list-coach/list-coach.component';


@NgModule({
  declarations: [
    ListCoachComponent
  ],
  imports: [
    CommonModule,
    CoachRoutingModule
  ]
})
export class CoachModule { }
