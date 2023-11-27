import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityRoutingModule } from './university-routing.module';
import { ListUniversityComponent } from './list-university/list-university.component';
import { AddUniversityComponent } from './add-university/add-university.component';
import { UpdateUniversityComponent } from './update-university/update-university.component';


@NgModule({
  declarations: [
    ListUniversityComponent,
    AddUniversityComponent,
    UpdateUniversityComponent
  ],
  imports: [
    CommonModule,
    UniversityRoutingModule
  ]
})
export class UniversityModule { }
