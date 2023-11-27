import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityRoutingModule } from './university-routing.module';
import { ListUniversityComponent } from './list-university/list-university.component';


@NgModule({
  declarations: [
    ListUniversityComponent
  ],
  imports: [
    CommonModule,
    UniversityRoutingModule
  ]
})
export class UniversityModule { }
