import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { ListBlocBackComponent } from './list-bloc-back/list-bloc-back.component';
import { AddBlocBackComponent } from './add-bloc-back/add-bloc-back.component';
import { ModifBlocBackComponent } from './modif-bloc-back/modif-bloc-back.component';


@NgModule({
  declarations: [
    ListBlocBackComponent,
    AddBlocBackComponent,
    ModifBlocBackComponent
  ],
  imports: [
    CommonModule,
    BlocRoutingModule
  ]
})
export class BlocModule { }
