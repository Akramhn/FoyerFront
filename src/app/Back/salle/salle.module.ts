import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalleRoutingModule } from './salle-routing.module';
import { ListSalleComponent } from './list-salle/list-salle.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListSalleComponent,
  ],
  imports: [
    CommonModule,
    SalleRoutingModule,
    HttpClientModule

  ]
})
export class SalleModule { }
