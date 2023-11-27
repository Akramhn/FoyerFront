import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { ListBlocBackComponent } from './list-bloc-back/list-bloc-back.component';


@NgModule({
  declarations: [
    ListBlocBackComponent
  ],
  imports: [
    CommonModule,
    BlocRoutingModule
  ]
})
export class BlocModule { }
